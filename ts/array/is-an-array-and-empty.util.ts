/** CHECK (is an `Array` instance of `[]`, an empty ordered list) */
export function IS_AN_ARRAY_AND_EMPTY<T = any> (v: any): v is T[] {
  return Array.isArray(v) && (v.length === 0)
}
