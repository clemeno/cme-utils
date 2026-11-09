import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_ON } from '../check/is-on.util.js'

/**
 * Keeps the input when it IS_ON or IS_NUMERIC, otherwise gives '-': a dash to display.
 * @param input - The value to display
 * @returns The input itself (identity), or '-' when it is neither on nor numeric
 * @example
 * ```typescript
 * OR_DASH(5) // returns 5
 * OR_DASH('abc') // returns 'abc'
 * OR_DASH(null) // returns '-'
 * OR_DASH('') // returns '-'
 * ```
 */
export function OR_DASH<T = any> (input: T): T | '-' {
  return (IS_ON(input) || IS_NUMERIC(input)) ? input : '-'
}
