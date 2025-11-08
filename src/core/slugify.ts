import type {
  SlugOptions,
  SlugResult,
  BatchOptions,
  Transformer,
} from "./types";
import {
  DEFAULT_OPTIONS,
  SAFE_PATTERNS,
  RFC3986_UNRESERVED,
} from "./constants";
import {
  StringProcessor,
  LanguageDetector,
  UniquenessGenerator,
  PerformanceMonitor,
  memoize,
} from "./utils";
import { InputValidator } from "../validators/input";
import { getCharmap } from "../locales/charmap";
import { transformEmojis } from "../transformers/emoji";
import { removeStopWords } from "../transformers/stopwords";

/**
 * Core slugification engine
 */
export class SlugEngine {
  private options: Required<SlugOptions>;
  private charmap: Map<string, string>;
  private preserved: Map<string, string> = new Map();

  constructor(options: SlugOptions = {}) {
    // Validate and merge with defaults
    const validated = InputValidator.validateOptions(options);
    this.options = {
      ...DEFAULT_OPTIONS,
      ...validated,
    } as Required<SlugOptions>;

    // Load appropriate charmap
    this.charmap = this.loadCharmap();
  }

  /**
   * Main slugification method
   */
  slugify(input: string): SlugResult {
    // Measure performance in development
    if (process.env.NODE_ENV === "development") {
      return PerformanceMonitor.measure("slugify", () => this._slugify(input));
    }

    return this._slugify(input);
  }

  /**
   * Internal slugification implementation
   */
  private _slugify(input: string): SlugResult {
    // Validate input
    const validInput = InputValidator.validateInput(input);

    if (!validInput) {
      return {
        slug: "",
        original: input,
      };
    }

    let result = validInput;
    const metadata: SlugResult = {
      slug: "",
      original: input,
    };

    // Step 1: Detect language if needed
    if (this.options.detectLanguage || this.options.locale === "auto") {
      const detected = LanguageDetector.detect(result);
      if (detected) {
        metadata.locale = detected;
        if (this.options.locale === "auto") {
          this.charmap = getCharmap(detected);
        }
      }
    }

    // Step 2: Apply custom transforms first
    if (this.options.transforms) {
      for (const transform of this.options.transforms) {
        result = transform(result, this.options);
      }
    }

    // Step 3: Handle preserve patterns
    if (this.options.preserve) {
      const { result: processed, preserved } = StringProcessor.preserveChars(
        result,
        this.options.preserve
      );
      result = processed;
      this.preserved = preserved;
    }

    // Step 4: Handle emojis
    if (this.options.emojis !== "preserve") {
      result = transformEmojis(result, this.options.emojis);
    }

    // Step 5: Apply custom replacements
    if (this.options.replacements) {
      const replacements = this.options.replacements;
      const entries: [string, string][] = Array.isArray(replacements)
        ? replacements
        : Object.entries(replacements);
      for (const [from, to] of entries) {
        result = result.split(from).join(to);
      }
    }

    // Step 6: Transliterate if needed
    if (this.options.transliterate && this.options.locale !== "preserve") {
      result = this.transliterate(result);
    }

    // Step 7: Remove stop words if needed
    if (this.options.removeStopWords) {
      const languages = Array.isArray(this.options.removeStopWords)
        ? this.options.removeStopWords
        : [metadata.locale || "en"];
      result = removeStopWords(result, languages);
    }

    // Step 8: Apply mode-specific transformations
    result = this.applyMode(result);

    // Step 9: Normalize whitespace to separator
    result = StringProcessor.normalizeWhitespace(
      result,
      this.options.separator
    );

    // Step 10: Remove unwanted characters
    if (this.options.remove) {
      result = StringProcessor.removeChars(result, this.options.remove);
    }

    // Step 11: Apply case transformation
    result = StringProcessor.applyCase(result, this.options.caseStyle);

    // Step 12: Collapse multiple separators
    result = StringProcessor.collapseSeparators(result, this.options.separator);

    // Step 13: Trim separators if needed
    if (this.options.trim) {
      result = StringProcessor.trimSeparators(result, this.options.separator);
    }

    // Step 14: Restore preserved characters
    if (this.preserved.size > 0) {
      result = StringProcessor.restoreChars(result, this.preserved);
    }

    // Step 15: Apply max length constraint
    if (this.options.maxLength) {
      const truncated = StringProcessor.truncate(
        result,
        this.options.maxLength,
        this.options.truncate,
        this.options.separator
      );
      result = truncated.result;
      metadata.truncated = truncated.truncated;
    }

    // Step 16: Apply uniqueness if needed
    if (this.options.uniqueness) {
      const uniqueOpts =
        typeof this.options.uniqueness === "object"
          ? this.options.uniqueness
          : { strategy: this.options.uniqueness };

      if (uniqueOpts.strategy !== "none") {
        result = UniquenessGenerator.generate(result, uniqueOpts.strategy, {
          store: uniqueOpts.store,
          hashLength: uniqueOpts.hashLength,
        });

        if (uniqueOpts.strategy === "counter" && result.includes("-")) {
          const parts = result.split("-");
          const lastPart = parts[parts.length - 1];
          if (/^\d+$/.test(lastPart!)) {
            metadata.uniqueId = parseInt(lastPart!, 10);
          }
        }
      }
    }

    metadata.slug = result;
    return metadata;
  }

  /**
   * Load appropriate character map
   */
  private loadCharmap(): Map<string, string> {
    let charmap = new Map<string, string>();

    // Load base charmap for the locale
    if (
      this.options.locale &&
      this.options.locale !== "preserve" &&
      this.options.locale !== "auto"
    ) {
      charmap = getCharmap(this.options.locale);
    }

    // Merge with custom charmap if provided
    if (this.options.customCharmap) {
      for (const [key, value] of Object.entries(this.options.customCharmap)) {
        charmap.set(key, value);
      }
    }

    return charmap;
  }

  /**
   * Transliterate using charmap
   */
  private transliterate(str: string): string {
    if (this.charmap.size === 0) {
      return str;
    }

    let result = "";

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      // Check for multi-character mappings (e.g., 'خ' -> 'kh')
      let mapped = false;

      // Try two-character lookup first
      if (i < str.length - 1) {
        const twoChar = char! + str[i + 1];
        if (this.charmap.has(twoChar)) {
          result += this.charmap.get(twoChar)!;
          i++; // Skip next character
          mapped = true;
        }
      }

      // Single character lookup
      if (!mapped) {
        const replacement = this.charmap.get(char!);
        result += replacement !== undefined ? replacement : char;
      }
    }

    return result;
  }

  /**
   * Apply mode-specific transformations
   */
  private applyMode(str: string): string {
    switch (this.options.mode) {
      case "strict":
        // Remove all non-alphanumeric except separator
        return str.replace(/[^a-zA-Z0-9\s-]/g, "");

      case "pretty":
        // Keep more characters for prettier URLs
        return str.replace(/[^\p{L}\p{N}\s\-._~]/gu, "");

      case "rfc3986":
        // Only keep RFC 3986 unreserved characters
        return Array.from(str)
          .map((char) =>
            RFC3986_UNRESERVED.includes(char) || char === " " ? char : ""
          )
          .join("");

      case "filename":
        // Safe for filesystem
        return str.replace(/[<>:"/\\|?*\x00-\x1F]/g, "");

      case "id":
        // Suitable for HTML IDs (start with letter, no spaces)
        let id = str.replace(/[^\p{L}\p{N}\-_]/gu, "");
        if (!/^[a-zA-Z]/.test(id)) {
          id = "id-" + id;
        }
        return id;

      case "normal":
      default:
        return str;
    }
  }

  /**
   * Batch processing
   */
  async slugifyBatch(
    inputs: string[],
    options?: BatchOptions
  ): Promise<SlugResult[]> {
    const validated = InputValidator.validateBatch(inputs);
    const batchOptions = options || this.options;

    // Progress callback
    const progress = options?.progressCallback;

    if ((batchOptions as BatchOptions).parallel && typeof (globalThis as any).Worker !== "undefined") {
      // Parallel processing using Web Workers (browser)
      // Implementation would require separate worker file
      console.warn("Parallel processing not yet implemented");
    }

    // Sequential processing with progress
    const results: SlugResult[] = [];

    for (let i = 0; i < validated.length; i++) {
      const engine = new SlugEngine(batchOptions);
      results.push(engine.slugify(validated[i]!));

      if (progress) {
        progress(i + 1, validated.length);
      }
    }

    return results;
  }

  /**
   * Update options
   */
  updateOptions(options: Partial<SlugOptions>): void {
    const validated = InputValidator.validateOptions(options);
    this.options = { ...this.options, ...validated } as Required<SlugOptions>;
    this.charmap = this.loadCharmap();
  }

  /**
   * Get current options
   */
  getOptions(): Readonly<Required<SlugOptions>> {
    return { ...this.options };
  }

  /**
   * Reset to defaults
   */
  reset(): void {
    this.options = { ...DEFAULT_OPTIONS } as Required<SlugOptions>;
    this.charmap = this.loadCharmap();
    this.preserved.clear();
  }
}

/**
 * Create memoized slugify function for performance
 */
export const createSlugifier = memoize(
  (options?: SlugOptions) => {
    const engine = new SlugEngine(options);
    return (input: string) => engine.slugify(input).slug;
  },
  100 // Cache last 100 configurations
);
