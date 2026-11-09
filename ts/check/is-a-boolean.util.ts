/** CHECK (is a `boolean`) */
export function IS_A_BOOLEAN (v: any): v is boolean {
  return typeof v === 'boolean'
}
