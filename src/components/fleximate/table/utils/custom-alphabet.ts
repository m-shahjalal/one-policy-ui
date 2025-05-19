/**
 * Default alphabet excluding similar looking characters (0/O, 1/l, etc.)
 * for better readability and reduced errors
 */
const DEFAULT_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZ" + // Uppercase (no I, O)
  "abcdefghijkmnpqrstuvwxyz" + // Lowercase (no l, o)
  "23456789" + // Numbers (no 0, 1)
  "_-"; // URL safe special chars

/**
 * Options for customizing ID generation
 */
export interface CustomAlphabetOptions {
  /** Characters to use for ID generation */
  alphabet?: string;
  /** Length of generated IDs */
  length?: number;
  /** Prefix for generated IDs */
  prefix?: string;
}

/**
 * Creates a function that generates unique IDs using a custom alphabet
 *
 * @param options - Configuration options
 * @returns A function that generates unique IDs
 *
 * @example
 * ```typescript
 * // Basic usage
 * const generateId = customAlphabet();
 * const id = generateId(); // "xK7m_p"
 *
 * // With options
 * const generateNumericId = customAlphabet({
 *   alphabet: '0123456789',
 *   length: 8,
 *   prefix: 'ID-'
 * });
 * const numericId = generateNumericId(); // "ID-12345678"
 * ```
 */
export const customAlphabet = (options: CustomAlphabetOptions = {}) => {
  const { alphabet = DEFAULT_ALPHABET, length = 6, prefix = "" } = options;

  // Convert alphabet to array once for better performance
  const chars = Array.from(alphabet);
  const charLength = chars.length;

  // Return function that generates IDs with optional prefix
  return () => {
    let id = "";
    for (let i = 0; i < length; i++) {
      id += chars[Math.floor(Math.random() * charLength)];
    }
    return `${prefix}${id}`;
  };
};

/**
 * Pre-configured generators for common use cases
 */
export const generators = {
  /** Generates numeric IDs (0-9) */
  numeric: customAlphabet({
    alphabet: "0123456789",
    length: 8,
  }),

  /** Generates lowercase alphanumeric IDs */
  lowercase: customAlphabet({
    alphabet: "abcdefghijklmnopqrstuvwxyz0123456789",
    length: 8,
  }),

  /** Generates uppercase alphanumeric IDs */
  uppercase: customAlphabet({
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    length: 8,
  }),

  /** Generates URL-safe IDs */
  urlSafe: customAlphabet({
    alphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
    length: 10,
  }),

  /** Generates short IDs for UI elements */
  uiElement: customAlphabet({
    alphabet: DEFAULT_ALPHABET,
    length: 6,
  }),
} as const;

/**
 * Timestamp-based ID generator for more uniqueness
 * Combines timestamp with random characters
 */
export const timestampId = (
  options: Omit<CustomAlphabetOptions, "length"> = {}
) => {
  const { alphabet = DEFAULT_ALPHABET, prefix = "" } = options;

  const chars = Array.from(alphabet);
  const charLength = chars.length;

  return () => {
    // Get timestamp
    const timestamp = Date.now().toString(36);

    // Add 4 random characters
    let random = "";
    for (let i = 0; i < 4; i++) {
      random += chars[Math.floor(Math.random() * charLength)];
    }

    return `${prefix}${timestamp}${random}`;
  };
};
