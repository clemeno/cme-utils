/** CHECK (is a valid `Date` instance) */
export const IS_A_DATE_AND_NOT_EMPTY = (o: any): o is Date => (o instanceof Date) && ((+o - +o) === 0)
