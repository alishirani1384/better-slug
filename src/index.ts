/**
 * better-slug - The most powerful, flexible, and performant slug library
 * @packageDocumentation
 */

import { SlugEngine, createSlugifier } from './core/slugify';
import type {
  SlugOptions,
  SlugResult,
  BatchOptions,
  Language,
  CaseStyle,
  SlugMode,
  UniquenessStrategy,
  CharMapEntry,
  LanguageConfig,
  Plugin,
  Transformer,
  Validator,
  CLIOptions
} from './core/types';
import { 
  StringProcessor,
  LanguageDetector,
  UniquenessGenerator,
  PerformanceMonitor,
  memoize
} from './core/utils';
import { 
  InputValidator, 
  ValidationError,
  isValidString,
  isValidOptions
} from './validators/input';
import { getCharmap, mergeCharmaps } from './locales/charmap';
import { transformEmojis } from './transformers/emoji';
import { removeStopWords, getStopWords } from './transformers/stopwords';
import { DEFAULT_OPTIONS, SAFE_PATTERNS, RFC3986_UNRESERVED, LIMITS } from './core/constants';

/**
 * Default slug instance for quick usage
 */
const defaultEngine = new SlugEngine();

/**
 * Main slugify function - simple API for most common use case
 * 
 * @param input - The string to slugify
 * @param options - Optional configuration options
 * @returns The slugified string
 * 
 * @example
 * ```typescript
 * import slugify from 'better-slug';
 * 
 * // Simple usage
 * slugify('Hello World!'); // 'hello-world'
 * 
 * // With options
 * slugify('Hello World!', { separator: '_' }); // 'hello_world'
 * 
 * // Farsi to English
 * slugify('سلام دنیا', { locale: 'fa' }); // 'salam-donya'
 * ```
 */
export function slugify(input: string, options?: SlugOptions): string {
  if (options) {
    const engine = new SlugEngine(options);
    return engine.slugify(input).slug;
  }
  return defaultEngine.slugify(input).slug;
}

/**
 * Advanced slugify function that returns metadata
 * 
 * @param input - The string to slugify
 * @param options - Optional configuration options
 * @returns SlugResult object with slug and metadata
 * 
 * @example
 * ```typescript
 * import { slugifyWithMetadata } from 'better-slug';
 * 
 * const result = slugifyWithMetadata('Hello World!', { 
 *   maxLength: 5,
 *   truncate: 'word'
 * });
 * // result = { slug: 'hello', original: 'Hello World!', truncated: true }
 * ```
 */
export function slugifyWithMetadata(input: string, options?: SlugOptions): SlugResult {
  const engine = new SlugEngine(options);
  return engine.slugify(input);
}

/**
 * Batch slugify function for processing multiple strings
 * 
 * @param inputs - Array of strings to slugify
 * @param options - Optional configuration options
 * @returns Array of slugified strings
 * 
 * @example
 * ```typescript
 * import { slugifyBatch } from 'better-slug';
 * 
 * const slugs = await slugifyBatch([
 *   'Hello World',
 *   'Goodbye World',
 *   'سلام دنیا'
 * ], { locale: 'auto' });
 * // ['hello-world', 'goodbye-world', 'salam-donya']
 * ```
 */
export async function slugifyBatch(
  inputs: string[], 
  options?: BatchOptions
): Promise<string[]> {
  const engine = new SlugEngine(options);
  const results = await engine.slugifyBatch(inputs, options);
  return results.map(r => r.slug);
}

/**
 * Create a custom slugify function with preset options
 * 
 * @param options - Configuration options to preset
 * @returns Custom slugify function
 * 
 * @example
 * ```typescript
 * import { createSlugify } from 'better-slug';
 * 
 * const slugifyGerman = createSlugify({ locale: 'de', caseStyle: 'lower' });
 * const slugifyFilename = createSlugify({ mode: 'filename', preserve: '.' });
 * 
 * slugifyGerman('Über uns'); // 'ueber-uns'
 * slugifyFilename('My File.pdf'); // 'my-file.pdf'
 * ```
 */
export function createSlugify(options: SlugOptions): (input: string) => string {
  const engine = new SlugEngine(options);
  return (input: string) => engine.slugify(input).slug;
}

/**
 * Create a slug engine instance for advanced usage
 * 
 * @param options - Configuration options
 * @returns SlugEngine instance
 * 
 * @example
 * ```typescript
 * import { createEngine } from 'better-slug';
 * 
 * const engine = createEngine({ locale: 'fa' });
 * 
 * // Use the engine
 * const result = engine.slugify('سلام');
 * 
 * // Update options
 * engine.updateOptions({ separator: '_' });
 * 
 * // Reset to defaults
 * engine.reset();
 * ```
 */
export function createEngine(options?: SlugOptions): SlugEngine {
  return new SlugEngine(options);
}

/**
 * Detect language of input text
 * 
 * @param text - Text to analyze
 * @returns Detected language code or null
 * 
 * @example
 * ```typescript
 * import { detectLanguage } from 'better-slug';
 * 
 * detectLanguage('Hello World'); // 'en'
 * detectLanguage('سلام دنیا'); // 'fa'
 * detectLanguage('你好世界'); // 'zh'
 * ```
 */
export function detectLanguage(text: string): Language | null {
  return LanguageDetector.detect(text);
}

/**
 * Check if text is right-to-left
 * 
 * @param text - Text to check
 * @returns True if RTL, false otherwise
 * 
 * @example
 * ```typescript
 * import { isRTL } from 'better-slug';
 * 
 * isRTL('سلام'); // true
 * isRTL('Hello'); // false
 * ```
 */
export function isRTL(text: string): boolean {
  return LanguageDetector.isRTL(text);
}

/**
 * Transform emojis in text
 * 
 * @param text - Text containing emojis
 * @param strategy - Transformation strategy
 * @returns Transformed text
 * 
 * @example
 * ```typescript
 * import { transformEmojis } from 'better-slug';
 * 
 * transformEmojis('I ❤️ JS', 'name'); // 'I heart JS'
 * transformEmojis('I ❤️ JS', 'remove'); // 'I  JS'
 * transformEmojis('I ❤️ JS', 'unicode'); // 'I 2764 JS'
 * ```
 */
export { transformEmojis };

/**
 * Remove stop words from text
 * 
 * @param text - Text to process
 * @param languages - Languages to consider for stop words
 * @returns Text without stop words
 * 
 * @example
 * ```typescript
 * import { removeStopWords } from 'better-slug';
 * 
 * removeStopWords('the quick brown fox', ['en']); // 'quick brown fox'
 * ```
 */
export { removeStopWords };

/**
 * Get stop words for a specific language
 * 
 * @param language - Language code
 * @returns Set of stop words
 * 
 * @example
 * ```typescript
 * import { getStopWords } from 'better-slug';
 * 
 * const englishStopWords = getStopWords('en');
 * // Set { 'a', 'an', 'and', 'the', ... }
 * ```
 */
export { getStopWords };

/**
 * Get character mapping for a specific language
 * 
 * @param language - Language code
 * @returns Character mapping
 * 
 * @example
 * ```typescript
 * import { getCharmap } from 'better-slug';
 * 
 * const farsiMap = getCharmap('fa');
 * // Map { 'ا' => 'a', 'ب' => 'b', ... }
 * ```
 */
export { getCharmap };

/**
 * Merge multiple character mappings
 * 
 * @param maps - Character mappings to merge
 * @returns Merged character mapping
 * 
 * @example
 * ```typescript
 * import { mergeCharmaps, getCharmap } from 'better-slug';
 * 
 * const combined = mergeCharmaps(
 *   getCharmap('fa'),
 *   getCharmap('ar')
 * );
 * ```
 */
export { mergeCharmaps };

/**
 * Validate input string
 * 
 * @param input - Value to validate
 * @returns True if valid string
 * 
 * @example
 * ```typescript
 * import { isValidString } from 'better-slug';
 * 
 * isValidString('Hello'); // true
 * isValidString(123); // false
 * isValidString(''); // true
 * ```
 */
export { isValidString };

/**
 * Validate slug options
 * 
 * @param options - Options to validate
 * @returns True if valid options
 * 
 * @example
 * ```typescript
 * import { isValidOptions } from 'better-slug';
 * 
 * isValidOptions({ separator: '-' }); // true
 * isValidOptions({ locale: 'invalid' }); // false
 * ```
 */
export { isValidOptions };

// Export classes for advanced usage
export { 
  SlugEngine,
  StringProcessor,
  LanguageDetector,
  UniquenessGenerator,
  PerformanceMonitor,
  InputValidator,
  ValidationError
};

// Export utility functions
export { memoize, createSlugifier };

// Export constants
export { DEFAULT_OPTIONS, SAFE_PATTERNS, RFC3986_UNRESERVED, LIMITS };

// Export all types
export type {
  SlugOptions,
  SlugResult,
  BatchOptions,
  Language,
  CaseStyle,
  SlugMode,
  UniquenessStrategy,
  CharMapEntry,
  LanguageConfig,
  Plugin,
  Transformer,
  Validator,
  CLIOptions
};

// Default export
export default slugify;

// Named exports for common presets
export const slugifyStrict = createSlugify({ mode: 'strict' });
export const slugifyPretty = createSlugify({ mode: 'pretty' });
export const slugifyFilename = createSlugify({ mode: 'filename', preserve: '.' });
export const slugifyId = createSlugify({ mode: 'id' });
export const slugifyURL = createSlugify({ mode: 'rfc3986' });

// Language-specific presets
export const slugifyFarsi = createSlugify({ locale: 'fa' });
export const slugifyArabic = createSlugify({ locale: 'ar' });
export const slugifyChinese = createSlugify({ locale: 'zh' });
export const slugifyJapanese = createSlugify({ locale: 'ja' });
export const slugifyKorean = createSlugify({ locale: 'ko' });
export const slugifyRussian = createSlugify({ locale: 'ru' });
export const slugifyGreek = createSlugify({ locale: 'el' });
export const slugifyHindi = createSlugify({ locale: 'hi' });

/**
 * Package version
 */
export { version } from '../package.json';