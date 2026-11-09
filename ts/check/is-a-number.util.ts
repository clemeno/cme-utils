/** CHECK (is a `number`) */
export function IS_A_NUMBER (v: any): v is number {
  return (typeof v === 'number') && !isNaN(v)
}
