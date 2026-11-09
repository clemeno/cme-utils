import { IS_EMPTY } from '../check/is-empty.util.js'

/**
 * Converts a value into a boolean: a boolean is kept, anything else is `true` when it is not empty (see IS_EMPTY).
 * Numbers and the string `'false'` are not empty, so they give `true`; use PARSE_BOOL to parse those.
 * @param v - The value to convert
 * @returns The boolean itself, else `false` for null, undefined, `''` and `[]`, `true` otherwise
 * @example
 * ```typescript
 * TO_BOOLEAN(true) // returns true
 * TO_BOOLEAN([1]) // returns true
 * TO_BOOLEAN(0) // returns true
 * TO_BOOLEAN('') // returns false
 * TO_BOOLEAN([]) // returns false
 * TO_BOOLEAN(null) // returns false
 * ```
 */
export function TO_BOOLEAN (v: any): boolean {
  return (typeof v === 'boolean') ? v : !IS_EMPTY(v)
}
