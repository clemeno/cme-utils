/** CHECK (is a valid `Date` instance) */
export function IS_A_DATE_AND_NOT_EMPTY (o: any): o is Date {
  return (o instanceof Date) && ((+o - +o) === 0)
}
