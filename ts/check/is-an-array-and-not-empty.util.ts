/** CHECK (is an `Array` instance of an oredered list with at least 1 slot) */
export const IS_AN_ARRAY_AND_NOT_EMPTY = <T = any> (v: any): v is T[] => Array.isArray(v) && (v.length !== 0)
