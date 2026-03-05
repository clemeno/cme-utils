/** CHECK (is a `string`, not `''`) */
export const IS_A_STRING_AND_NOT_EMPTY = (v: any): v is string => (typeof v === 'string') && (v !== '')
