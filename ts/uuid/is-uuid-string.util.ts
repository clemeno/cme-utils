/**
 * CHECK (is a lowercase UUID string in the 8-4-4-4-12 format)
 * @param v - The value to check
 * @returns `true` when `v` is a lowercase hyphenated UUID string
 * @example
 * ```typescript
 * IS_UUID_STRING('01234567-89ab-cdef-0123-456789abcdef') // returns true
 * IS_UUID_STRING('01234567-89AB-CDEF-0123-456789ABCDEF') // returns false
 * IS_UUID_STRING('01234567') // returns false
 * IS_UUID_STRING(null) // returns false
 * ```
 */
export function IS_UUID_STRING (v: any): v is string {
  return (
    (typeof v === 'string') &&
    (v !== '') &&
    (v.length === 36) &&
    (v[8] === '-') &&
    (v[13] === '-') &&
    (v[18] === '-') &&
    (v[23] === '-') &&
    (v === v.toLowerCase()) &&
    (v === v.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)?.[0])
  )
}
