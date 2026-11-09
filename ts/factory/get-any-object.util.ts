/**
 * Generates a new empty `Record` `{}` instance of `any` type.
 * @returns A fresh empty object, never shared between calls
 * @example
 * ```typescript
 * GET_ANY_OBJECT() // returns {}
 * GET_ANY_OBJECT() === GET_ANY_OBJECT() // returns false
 * ```
 */
export function GET_ANY_OBJECT (): any {
  return {}
}
