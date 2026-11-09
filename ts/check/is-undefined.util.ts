/** CHECK (is `undefined`) */
export function IS_UNDEFINED (v: any): v is undefined {
  return typeof v === 'undefined'
}
