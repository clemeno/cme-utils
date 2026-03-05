/** CHECK (is an `Array` instance) */
export const IS_AN_ARRAY = <T = any> (v: any): v is T[] => Array.isArray(v)
