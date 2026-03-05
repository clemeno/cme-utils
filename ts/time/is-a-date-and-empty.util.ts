/** CHECK (is an invalid `Date` instance) */
export const IS_A_DATE_AND_EMPTY = (o: any): o is Date => (o instanceof Date) && ((+o - +o) !== 0)
