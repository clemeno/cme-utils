/** CHECK (is a `bigint`) */
export function IS_A_BIGINT (v: any): v is bigint {
  return typeof v === 'bigint'
}
