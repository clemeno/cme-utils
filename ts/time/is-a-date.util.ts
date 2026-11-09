/** CHECK (is a `Date` instance) */
export function IS_A_DATE (o: any): o is Date {
  return o instanceof Date
}
