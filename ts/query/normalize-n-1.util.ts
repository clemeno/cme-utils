import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Normalizes a numeric value within specified bounds (inclusive).
 * Useful for pagination, limits, and other bounded numeric inputs.
 * @param options - Normalization options
 * @param options.n - The value to normalize (defaults to 1)
 * @param options.min - Minimum allowed value (defaults to 1)
 * @param options.max - Maximum allowed value (defaults to 1)
 * @param options.def - Default value if input is invalid (defaults to 1)
 * @returns The normalized value as a string, clamped between min and max
 * @example
 * ```typescript
 * NORMALIZE_N_1({ n: 5, min: 1, max: 10 }) // returns '5'
 * NORMALIZE_N_1({ n: 15, min: 1, max: 10 }) // returns '10' (clamped)
 * NORMALIZE_N_1({ n: 'invalid', min: 1, max: 10, def: 5 }) // returns '5'
 * ```
 */
export const NORMALIZE_N_1 = (_: { n?: numeric, min?: numeric, max?: numeric, def?: numeric }): string => {
  const n = TO_NUMBER(_.n ?? 1)
  const min = TO_NUMBER(_.min ?? 1)
  const max = TO_NUMBER(_.max ?? 1)
  const def = TO_STRING(_.def ?? 1)

  // Clamp value between min and max, return default if invalid
  return IS_NUMERIC(n) ? TO_STRING(Math.max(min, Math.min(n, max))) : def
}
