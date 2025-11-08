/**
 * Supported languages for transliteration
 */
export type Language = 
  | 'en' | 'fa' | 'ar' | 'zh' | 'ja' | 'ko' | 'ru' | 'de' | 'fr' | 'es'
  | 'it' | 'pt' | 'nl' | 'sv' | 'no' | 'da' | 'fi' | 'is' | 'pl' | 'cs'
  | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sr' | 'uk' | 'be' | 'el' | 'tr'
  | 'he' | 'hi' | 'bn' | 'ta' | 'te' | 'th' | 'vi' | 'id' | 'ms' | 'tl'
  | 'ur' | 'gu' | 'kn' | 'ml' | 'si' | 'my' | 'ka' | 'am' | 'km' | 'lo';

/**
 * Case transformation options
 */
export type CaseStyle = 'lower' | 'upper' | 'title' | 'sentence' | 'camel' | 'pascal' | 'preserve';

/**
 * Slug generation mode
 */
export type SlugMode = 'normal' | 'strict' | 'pretty' | 'rfc3986' | 'filename' | 'id';

/**
 * Uniqueness strategy
 */
export type UniquenessStrategy = 'none' | 'counter' | 'hash' | 'timestamp' | 'random';

/**
 * Main configuration options for slugification
 */
export interface SlugOptions {
  /**
   * Output language for the slug (default: 'en')
   * Set to 'preserve' to keep original language
   */
  locale?: Language | 'preserve' | 'auto';

  /**
   * Character used to separate words (default: '-')
   */
  separator?: string;

  /**
   * Case transformation style (default: 'lower')
   */
  caseStyle?: CaseStyle;

  /**
   * Maximum length of the slug
   */
  maxLength?: number;

  /**
   * Truncation strategy when maxLength is exceeded
   */
  truncate?: 'word' | 'char' | 'smart';

  /**
   * Characters to preserve in the output
   */
  preserve?: string | string[] | RegExp;

  /**
   * Custom character replacements
   */
  replacements?: Map<string, string> | Record<string, string>;

  /**
   * Remove specified characters/patterns
   */
  remove?: string | string[] | RegExp;

  /**
   * Slug generation mode
   */
  mode?: SlugMode;

  /**
   * Enable transliteration (default: true)
   */
  transliterate?: boolean;

  /**
   * Handle emojis specially
   */
  emojis?: 'remove' | 'name' | 'unicode' | 'preserve';

  /**
   * Remove common stop words
   */
  removeStopWords?: boolean | Language[];

  /**
   * Trim separators from start/end
   */
  trim?: boolean;

  /**
   * Uniqueness generation strategy
   */
  uniqueness?: UniquenessStrategy | {
    strategy: UniquenessStrategy;
    store?: Map<string, number> | Set<string>;
    hashLength?: number;
  };

  /**
   * Custom transformation pipeline
   */
  transforms?: Array<(str: string, options: SlugOptions) => string>;

  /**
   * Enable smart language detection
   */
  detectLanguage?: boolean;

  /**
   * Preserve Unicode characters
   */
  preserveUnicode?: boolean;

  /**
   * Custom charmap override
   */
  customCharmap?: Map<string, string> | Record<string, string>;
}

/**
 * Result object with metadata
 */
export interface SlugResult {
  slug: string;
  original: string;
  locale?: Language;
  truncated?: boolean;
  uniqueId?: string | number;
  metadata?: Record<string, unknown>;
}

/**
 * Batch processing options
 */
export interface BatchOptions extends SlugOptions {
  parallel?: boolean;
  progressCallback?: (current: number, total: number) => void;
}

/**
 * CLI options
 */
export interface CLIOptions extends SlugOptions {
  input?: string;
  file?: string;
  output?: string;
  json?: boolean;
  verbose?: boolean;
  benchmark?: boolean;
}

/**
 * Character mapping entry
 */
export interface CharMapEntry {
  char: string;
  replacement: string;
  languages?: Language[];
  context?: string;
}

/**
 * Language configuration
 */
export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  charmap: Map<string, string>;
  stopWords?: Set<string>;
  special?: {
    numerals?: Map<string, string>;
    punctuation?: Map<string, string>;
    symbols?: Map<string, string>;
  };
}

/**
 * Transformer function type
 */
export type Transformer = (input: string, options: SlugOptions) => string;

/**
 * Validator function type
 */
export type Validator = (input: unknown) => input is string;

/**
 * Plugin interface
 */
export interface Plugin {
  name: string;
  version: string;
  transform?: Transformer;
  validate?: Validator;
  languages?: LanguageConfig[];
  priority?: number;
}