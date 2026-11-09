/** CHECK (is a `string`, not `''`) */
export function IS_A_STRING_AND_NOT_EMPTY (v: any): v is string {
  return (typeof v === 'string') && (v !== '')
}
