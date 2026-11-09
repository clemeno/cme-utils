/**
 * Generates a new empty `Array` `[]` instance of `any[]` type.
 * @returns A fresh empty array, never shared between calls
 * @example
 * ```typescript
 * GET_ANY_ARRAY() // returns []
 * GET_ANY_ARRAY() === GET_ANY_ARRAY() // returns false
 * ```
 */
export function GET_ANY_ARRAY (): any[] {
  return []
}
