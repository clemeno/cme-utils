/** CHECK (is an `Array` instance) */
export function IS_AN_ARRAY<T = any> (v: any): v is T[] {
  return Array.isArray(v)
}
