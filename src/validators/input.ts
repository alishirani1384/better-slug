import type { SlugOptions, Language, CaseStyle, SlugMode } from '../core/types';
import { LIMITS } from '../core/constants';

/**
 * Input validation error
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Input validators
 */
export class InputValidator {
  /**
   * Validate input string
   */
  static validateInput(input: unknown): string {
    if (typeof input !== 'string') {
      throw new ValidationError(
        `Expected string input, got ${typeof input}`,
        'input',
        input
      );
    }
    
    if (input.length === 0) {
      return '';
    }
    
    if (input.length > LIMITS.MAX_INPUT_LENGTH) {
      throw new ValidationError(
        `Input exceeds maximum length of ${LIMITS.MAX_INPUT_LENGTH}`,
        'input',
        input
      );
    }
    
    return input;
  }

  /**
   * Validate and normalize options
   */
  static validateOptions(options?: Partial<SlugOptions>): SlugOptions {
    if (!options) {
      return {} as SlugOptions;
    }
    
    const validated: SlugOptions = { ...options };
    
    // Validate locale
    if (validated.locale && validated.locale !== 'preserve' && validated.locale !== 'auto') {
      this.validateLocale(validated.locale);
    }
    
    // Validate separator
    if (validated.separator !== undefined) {
      this.validateSeparator(validated.separator);
    }
    
    // Validate case style
    if (validated.caseStyle) {
      this.validateCaseStyle(validated.caseStyle);
    }
    
    // Validate max length
    if (validated.maxLength !== undefined) {
      this.validateMaxLength(validated.maxLength);
    }
    
    // Validate mode
    if (validated.mode) {
      this.validateMode(validated.mode);
    }
    
    // Validate custom replacements
    if (validated.replacements) {
      validated.replacements = this.normalizeReplacements(validated.replacements);
    }
    
    // Validate custom charmap
    if (validated.customCharmap) {
      validated.customCharmap = this.normalizeCharmap(validated.customCharmap);
    }
    
    return validated;
  }

  /**
   * Validate locale
   */
  private static validateLocale(locale: string): void {
    const validLocales: Set<string> = new Set([
      'en', 'fa', 'ar', 'zh', 'ja', 'ko', 'ru', 'de', 'fr', 'es',
      'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'is', 'pl', 'cs',
      'sk', 'hu', 'ro', 'bg', 'hr', 'sr', 'uk', 'be', 'el', 'tr',
      'he', 'hi', 'bn', 'ta', 'te', 'th', 'vi', 'id', 'ms', 'tl',
      'ur', 'gu', 'kn', 'ml', 'si', 'my', 'ka', 'am', 'km', 'lo'
    ]);
    
    if (!validLocales.has(locale)) {
      throw new ValidationError(
        `Invalid locale: ${locale}`,
        'locale',
        locale
      );
    }
  }

  /**
   * Validate separator
   */
  private static validateSeparator(separator: string): void {
    if (typeof separator !== 'string') {
      throw new ValidationError(
        'Separator must be a string',
        'separator',
        separator
      );
    }
    
    if (separator.length > LIMITS.MAX_SEPARATOR_LENGTH) {
      throw new ValidationError(
        `Separator exceeds maximum length of ${LIMITS.MAX_SEPARATOR_LENGTH}`,
        'separator',
        separator
      );
    }
  }

  /**
   * Validate case style
   */
  private static validateCaseStyle(caseStyle: string): void {
    const validStyles: Set<CaseStyle> = new Set([
      'lower', 'upper', 'title', 'sentence', 'camel', 'pascal', 'preserve'
    ]);
    
    if (!validStyles.has(caseStyle as CaseStyle)) {
      throw new ValidationError(
        `Invalid case style: ${caseStyle}`,
        'caseStyle',
        caseStyle
      );
    }
  }

  /**
   * Validate max length
   */
  private static validateMaxLength(maxLength: number): void {
    if (typeof maxLength !== 'number' || maxLength < 1) {
      throw new ValidationError(
        'Max length must be a positive number',
        'maxLength',
        maxLength
      );
    }
    
    if (maxLength > LIMITS.MAX_INPUT_LENGTH) {
      throw new ValidationError(
        `Max length exceeds maximum of ${LIMITS.MAX_INPUT_LENGTH}`,
        'maxLength',
        maxLength
      );
    }
  }

  /**
   * Validate mode
   */
  private static validateMode(mode: string): void {
    const validModes: Set<SlugMode> = new Set([
      'normal', 'strict', 'pretty', 'rfc3986', 'filename', 'id'
    ]);
    
    if (!validModes.has(mode as SlugMode)) {
      throw new ValidationError(
        `Invalid mode: ${mode}`,
        'mode',
        mode
      );
    }
  }

  /**
   * Normalize replacements to Map
   */
  private static normalizeReplacements(
    replacements: Map<string, string> | Record<string, string>
  ): Map<string, string> {
    if (replacements instanceof Map) {
      return replacements;
    }
    
    return new Map(Object.entries(replacements));
  }

  /**
   * Normalize charmap to Map
   */
  private static normalizeCharmap(
    charmap: Map<string, string> | Record<string, string>
  ): Map<string, string> {
    if (charmap instanceof Map) {
      return charmap;
    }
    
    return new Map(Object.entries(charmap));
  }

  /**
   * Validate batch inputs
   */
  static validateBatch(inputs: unknown[]): string[] {
    if (!Array.isArray(inputs)) {
      throw new ValidationError(
        'Batch input must be an array',
        'inputs',
        inputs
      );
    }
    
    if (inputs.length > LIMITS.MAX_BATCH_SIZE) {
      throw new ValidationError(
        `Batch size exceeds maximum of ${LIMITS.MAX_BATCH_SIZE}`,
        'inputs',
        inputs
      );
    }
    
    return inputs.map((input, index) => {
      try {
        return this.validateInput(input);
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new ValidationError(
            `Invalid input at index ${index}: ${error.message}`,
            `inputs[${index}]`,
            input
          );
        }
        throw error;
      }
    });
  }
}

/**
 * Type guard for string validation
 */
export function isValidString(input: unknown): input is string {
  return typeof input === 'string' && input.length <= LIMITS.MAX_INPUT_LENGTH;
}

/**
 * Type guard for options validation
 */
export function isValidOptions(options: unknown): options is SlugOptions {
  if (!options || typeof options !== 'object') {
    return false;
  }
  
  try {
    InputValidator.validateOptions(options as SlugOptions);
    return true;
  } catch {
    return false;
  }
}