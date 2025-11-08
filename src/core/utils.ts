import type { Language, CaseStyle } from './types';
import { RTL_LANGUAGES, LIMITS } from './constants';

/**
 * Fast string operations without regex for performance
 */
export class StringProcessor {
  /**
   * Efficiently replace multiple consecutive separators
   */
  static collapseSeparators(str: string, separator: string): string {
    if (!str || !separator) return str;
    
    let result = '';
    let lastWasSeparator = false;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const isSeparator = char === separator;
      
      if (!isSeparator || !lastWasSeparator) {
        result += char;
      }
      
      lastWasSeparator = isSeparator;
    }
    
    return result;
  }

  /**
   * Trim separators from start and end without regex
   */
  static trimSeparators(str: string, separator: string): string {
    if (!str || !separator) return str;
    
    let start = 0;
    let end = str.length;
    
    // Trim from start
    while (start < end && str[start] === separator) {
      start++;
    }
    
    // Trim from end
    while (end > start && str[end - 1] === separator) {
      end--;
    }
    
    return str.slice(start, end);
  }

  /**
   * Fast whitespace normalization
   */
  static normalizeWhitespace(str: string, replacement: string = ' '): string {
    let result = '';
    let lastWasSpace = false;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const isSpace = /\s/.test(char!);
      
      if (isSpace) {
        if (!lastWasSpace) {
          result += replacement;
        }
        lastWasSpace = true;
      } else {
        result += char;
        lastWasSpace = false;
      }
    }
    
    return result.trim();
  }

  /**
   * Apply case transformation
   */
  static applyCase(str: string, caseStyle: CaseStyle): string {
    switch (caseStyle) {
      case 'lower':
        return str.toLowerCase();
      
      case 'upper':
        return str.toUpperCase();
      
      case 'title':
        return str.replace(/\b\w/g, char => char.toUpperCase());
      
      case 'sentence':
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      
      case 'camel':
        return str.replace(/[-_\s]+(.)?/g, (_, char) => 
          char ? char.toUpperCase() : ''
        );
      
      case 'pascal':
        const camel = this.applyCase(str, 'camel');
        return camel.charAt(0).toUpperCase() + camel.slice(1);
      
      case 'preserve':
      default:
        return str;
    }
  }

  /**
   * Smart truncation at word boundaries
   */
  static truncate(
    str: string, 
    maxLength: number, 
    strategy: 'word' | 'char' | 'smart',
    separator: string = '-'
  ): { result: string; truncated: boolean } {
    if (str.length <= maxLength) {
      return { result: str, truncated: false };
    }

    if (strategy === 'char') {
      return { result: str.slice(0, maxLength), truncated: true };
    }

    if (strategy === 'word') {
      const truncated = str.slice(0, maxLength);
      const lastSeparator = truncated.lastIndexOf(separator);
      
      if (lastSeparator > 0) {
        return { result: truncated.slice(0, lastSeparator), truncated: true };
      }
      
      return { result: truncated, truncated: true };
    }

    // Smart truncation: try to keep meaningful parts
    const parts = str.split(separator);
    let result = '';
    let currentLength = 0;
    
    for (const part of parts) {
      const nextLength = currentLength + part.length + (result ? separator.length : 0);
      
      if (nextLength > maxLength) {
        break;
      }
      
      if (result) {
        result += separator;
      }
      result += part;
      currentLength = nextLength;
    }
    
    return { result: result || str.slice(0, maxLength), truncated: true };
  }

  /**
   * Remove characters based on pattern
   */
  static removeChars(str: string, pattern: string | string[] | RegExp): string {
    if (!pattern) return str;
    
    if (pattern instanceof RegExp) {
      return str.replace(pattern, '');
    }
    
    if (Array.isArray(pattern)) {
      let result = str;
      for (const p of pattern) {
        result = result.split(p).join('');
      }
      return result;
    }
    
    return str.split(pattern).join('');
  }

  /**
   * Preserve specified characters
   */
  static preserveChars(
    str: string, 
    preserve: string | string[] | RegExp,
    placeholder: string = '_PRESERVE_'
  ): { result: string; preserved: Map<string, string> } {
    const preserved = new Map<string, string>();
    
    if (!preserve) {
      return { result: str, preserved };
    }
    
    let counter = 0;
    let result = str;
    
    const chars = Array.isArray(preserve) ? preserve : [preserve];
    
    for (const char of chars) {
      if (typeof char === 'string' && result.includes(char)) {
        const key = `${placeholder}${counter++}_`;
        preserved.set(key, char);
        result = result.split(char).join(key);
      }
    }
    
    return { result, preserved };
  }

  /**
   * Restore preserved characters
   */
  static restoreChars(str: string, preserved: Map<string, string>): string {
    let result = str;
    
    for (const [key, value] of preserved) {
      result = result.split(key).join(value);
    }
    
    return result;
  }
}

/**
 * Language detection utilities
 */
export class LanguageDetector {
  private static readonly SCRIPT_RANGES: Map<string, Language[]> = new Map([
    ['[\u0600-\u06FF]', ['ar', 'fa', 'ur']], // Arabic script
    ['[\u4E00-\u9FFF]', ['zh']], // Chinese
    ['[\u3040-\u309F\u30A0-\u30FF]', ['ja']], // Japanese
    ['[\uAC00-\uD7AF]', ['ko']], // Korean
    ['[\u0400-\u04FF]', ['ru', 'uk', 'be', 'bg']], // Cyrillic
    ['[\u0590-\u05FF]', ['he']], // Hebrew
    ['[\u0900-\u097F]', ['hi']], // Devanagari
    ['[\u0E00-\u0E7F]', ['th']], // Thai
  ]);

  /**
   * Detect the most likely language of the input
   */
  static detect(text: string): Language | null {
    if (!text) return null;
    
    const scriptCounts = new Map<Language, number>();
    
    for (const [pattern, languages] of this.SCRIPT_RANGES) {
      const regex = new RegExp(pattern, 'g');
      const matches = text.match(regex);
      
      if (matches) {
        const count = matches.length;
        for (const lang of languages) {
          scriptCounts.set(lang, (scriptCounts.get(lang) || 0) + count);
        }
      }
    }
    
    if (scriptCounts.size === 0) {
      // Default to English for Latin script
      return /[a-zA-Z]/.test(text) ? 'en' : null;
    }
    
    // Return language with highest count
    let maxCount = 0;
    let detectedLang: Language | null = null;
    
    for (const [lang, count] of scriptCounts) {
      if (count > maxCount) {
        maxCount = count;
        detectedLang = lang;
      }
    }
    
    return detectedLang;
  }

  /**
   * Check if text is RTL
   */
  static isRTL(text: string): boolean {
    const detected = this.detect(text);
    return detected ? RTL_LANGUAGES.has(detected) : false;
  }
}

/**
 * Uniqueness generator utilities
 */
export class UniquenessGenerator {
  private static counters = new Map<string, number>();
  
  /**
   * Generate unique suffix based on strategy
   */
  static generate(
    base: string,
    strategy: 'counter' | 'hash' | 'timestamp' | 'random',
    options?: {
      store?: Set<string> | Map<string, number>;
      hashLength?: number;
    }
  ): string {
    switch (strategy) {
      case 'counter':
        return this.withCounter(base, options?.store);
      
      case 'hash':
        return this.withHash(base, options?.hashLength || 6);
      
      case 'timestamp':
        return this.withTimestamp(base);
      
      case 'random':
        return this.withRandom(base);
      
      default:
        return base;
    }
  }

  private static withCounter(
    base: string, 
    store?: Set<string> | Map<string, number>
  ): string {
    if (store instanceof Set) {
      let counter = 1;
      let result = base;
      
      while (store.has(result)) {
        result = `${base}-${counter}`;
        counter++;
      }
      
      store.add(result);
      return result;
    }
    
    if (store instanceof Map) {
      const count = (store.get(base) || 0) + 1;
      store.set(base, count);
      return count > 1 ? `${base}-${count}` : base;
    }
    
    // Use internal counter
    const count = (this.counters.get(base) || 0) + 1;
    this.counters.set(base, count);
    return count > 1 ? `${base}-${count}` : base;
  }

  private static withHash(base: string, length: number): string {
    // Simple hash function for browser compatibility
    let hash = 0;
    const time = Date.now();
    const str = base + time;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const hashStr = Math.abs(hash).toString(36);
    return `${base}-${hashStr.slice(0, length)}`;
  }

  private static withTimestamp(base: string): string {
    return `${base}-${Date.now()}`;
  }

  private static withRandom(base: string): string {
    const random = Math.random().toString(36).slice(2, 8);
    return `${base}-${random}`;
  }

  /**
   * Clear internal counters
   */
  static clearCounters(): void {
    this.counters.clear();
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static timings = new Map<string, number[]>();
  
  /**
   * Measure function execution time
   */
  static measure<T>(
    name: string,
    fn: () => T
  ): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    const duration = end - start;
    const timings = this.timings.get(name) || [];
    timings.push(duration);
    this.timings.set(name, timings);
    
    return result;
  }

  /**
   * Get statistics for a measured function
   */
  static getStats(name: string): {
    count: number;
    total: number;
    average: number;
    min: number;
    max: number;
  } | null {
    const timings = this.timings.get(name);
    
    if (!timings || timings.length === 0) {
      return null;
    }
    
    const total = timings.reduce((sum, t) => sum + t, 0);
    
    return {
      count: timings.length,
      total,
      average: total / timings.length,
      min: Math.min(...timings),
      max: Math.max(...timings),
    };
  }

  /**
   * Clear timing data
   */
  static clear(name?: string): void {
    if (name) {
      this.timings.delete(name);
    } else {
      this.timings.clear();
    }
  }
}

/**
 * Memoization decorator for performance
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize: number = 1000
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    
    // Limit cache size
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey!);
    }
    
    cache.set(key, result);
    return result;
  }) as T;
}