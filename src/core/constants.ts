import type { SlugOptions, Language } from './types';

/**
 * Default slug options
 */
export const DEFAULT_OPTIONS: Required<Omit<SlugOptions, 'replacements' | 'customCharmap' | 'uniqueness' | 'transforms'>> = {
  locale: 'en',
  separator: '-',
  caseStyle: 'lower',
  maxLength: 200,
  truncate: 'word',
  preserve: '',
  remove: '',
  mode: 'normal',
  transliterate: true,
  emojis: 'remove',
  removeStopWords: false,
  trim: true,
  detectLanguage: false,
  preserveUnicode: false,
};

/**
 * Safe regex patterns to avoid ReDoS
 */
export const SAFE_PATTERNS = {
  WHITESPACE: /\s+/g,
  NON_ALPHANUMERIC: /[^\p{L}\p{N}]+/gu,
  MULTIPLE_SEPARATORS: /--+/g,
  TRIM_SEPARATORS: /^-+|-+$/g,
  WORD_BOUNDARY: /\b\w+\b/g,
} as const;

/**
 * RFC 3986 unreserved characters
 */
export const RFC3986_UNRESERVED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

/**
 * Maximum processing limits for safety
 */
export const LIMITS = {
  MAX_INPUT_LENGTH: 10000,
  MAX_BATCH_SIZE: 10000,
  MAX_SEPARATOR_LENGTH: 10,
} as const;

/**
 * Language detection confidence threshold
 */
export const LANGUAGE_DETECTION_THRESHOLD = 0.8;

/**
 * Supported RTL languages
 */
export const RTL_LANGUAGES: Set<Language> = new Set(['ar', 'fa', 'he', 'ur']);