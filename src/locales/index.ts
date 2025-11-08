/**
 * Locale management and exports
 */

import { getFarsiCharmap, getFarsiStopWords } from './languages/farsi';
import { getArabicCharmap, getArabicStopWords } from './languages/arabic';
import { getChineseCharmap, getChineseStopWords } from './languages/chinese';
import { getJapaneseCharmap, getJapaneseStopWords } from './languages/japanese';
import { getKoreanCharmap } from './languages/korean';
import { getRussianCharmap } from './languages/russian';
import { getGreekCharmap } from './languages/greek';
import { getHebrewCharmap } from './languages/hebrew';
import { getHindiCharmap } from './languages/hindi';
import { getThaiCharmap } from './languages/thai';
import { getVietnameseCharmap } from './languages/vietnamese';
import { getCommonCharmap } from './languages/common';

import type { Language, LanguageConfig } from '../core/types';

/**
 * Language configurations registry
 */
const LANGUAGE_CONFIGS: Map<Language, LanguageConfig> = new Map();

// Register Farsi/Persian
LANGUAGE_CONFIGS.set('fa', {
  code: 'fa',
  name: 'Persian',
  nativeName: 'فارسی',
  direction: 'rtl',
  charmap: getFarsiCharmap(),
  stopWords: getFarsiStopWords(),
});

// Register Arabic
LANGUAGE_CONFIGS.set('ar', {
  code: 'ar',
  name: 'Arabic',
  nativeName: 'العربية',
  direction: 'rtl',
  charmap: getArabicCharmap(),
  stopWords: getArabicStopWords(),
});

// Register Chinese
LANGUAGE_CONFIGS.set('zh', {
  code: 'zh',
  name: 'Chinese',
  nativeName: '中文',
  direction: 'ltr',
  charmap: getChineseCharmap(),
  stopWords: getChineseStopWords(),
});

// Register Japanese
LANGUAGE_CONFIGS.set('ja', {
  code: 'ja',
  name: 'Japanese',
  nativeName: '日本語',
  direction: 'ltr',
  charmap: getJapaneseCharmap(),
  stopWords: getJapaneseStopWords(),
});

// Register Korean
LANGUAGE_CONFIGS.set('ko', {
  code: 'ko',
  name: 'Korean',
  nativeName: '한국어',
  direction: 'ltr',
  charmap: getKoreanCharmap(),
});

// Register Russian
LANGUAGE_CONFIGS.set('ru', {
  code: 'ru',
  name: 'Russian',
  nativeName: 'Русский',
  direction: 'ltr',
  charmap: getRussianCharmap(),
});

// Register Greek
LANGUAGE_CONFIGS.set('el', {
  code: 'el',
  name: 'Greek',
  nativeName: 'Ελληνικά',
  direction: 'ltr',
  charmap: getGreekCharmap(),
});

// Register Hebrew
LANGUAGE_CONFIGS.set('he', {
  code: 'he',
  name: 'Hebrew',
  nativeName: 'עברית',
  direction: 'rtl',
  charmap: getHebrewCharmap(),
});

// Register Hindi
LANGUAGE_CONFIGS.set('hi', {
  code: 'hi',
  name: 'Hindi',
  nativeName: 'हिन्दी',
  direction: 'ltr',
  charmap: getHindiCharmap(),
});

// Register Thai
LANGUAGE_CONFIGS.set('th', {
  code: 'th',
  name: 'Thai',
  nativeName: 'ไทย',
  direction: 'ltr',
  charmap: getThaiCharmap(),
});

// Register Vietnamese
LANGUAGE_CONFIGS.set('vi', {
  code: 'vi',
  name: 'Vietnamese',
  nativeName: 'Tiếng Việt',
  direction: 'ltr',
  charmap: getVietnameseCharmap(),
});

// Register common/default
LANGUAGE_CONFIGS.set('en', {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  direction: 'ltr',
  charmap: getCommonCharmap(),
});

/**
 * Get language configuration
 * @param language - Language code
 * @returns Language configuration or null if not found
 */
export function getLanguageConfig(language: Language): LanguageConfig | null {
  return LANGUAGE_CONFIGS.get(language) || null;
}

/**
 * Get all supported languages
 * @returns Array of language codes
 */
export function getSupportedLanguages(): Language[] {
  return Array.from(LANGUAGE_CONFIGS.keys());
}

/**
 * Check if a language is supported
 * @param language - Language code to check
 * @returns True if supported
 */
export function isLanguageSupported(language: string): language is Language {
  return LANGUAGE_CONFIGS.has(language as Language);
}

/**
 * Get language name
 * @param language - Language code
 * @param native - Return native name if true
 * @returns Language name or null
 */
export function getLanguageName(language: Language, native = false): string | null {
  const config = LANGUAGE_CONFIGS.get(language);
  if (!config) return null;
  return native ? config.nativeName : config.name;
}

/**
 * Get language direction
 * @param language - Language code
 * @returns 'ltr' or 'rtl'
 */
export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  const config = LANGUAGE_CONFIGS.get(language);
  return config?.direction || 'ltr';
}

// Re-export individual language functions
export {
  getFarsiCharmap,
  getFarsiStopWords,
  getArabicCharmap,
  getArabicStopWords,
  getChineseCharmap,
  getChineseStopWords,
  getJapaneseCharmap,
  getJapaneseStopWords,
  getKoreanCharmap,
  getRussianCharmap,
  getGreekCharmap,
  getHebrewCharmap,
  getHindiCharmap,
  getThaiCharmap,
  getVietnameseCharmap,
  getCommonCharmap,
};