/** CHECK (is a `string`) */
export function IS_A_STRING (v: any): v is string {
  return typeof v === 'string'
}
