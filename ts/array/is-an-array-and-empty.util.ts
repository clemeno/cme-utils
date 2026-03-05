/** CHECK (is an `Array` instance of `[]`, an empty ordered list) */
export const IS_AN_ARRAY_AND_EMPTY = <T = any> (v: any): v is T[] => Array.isArray(v) && (v.length === 0)
