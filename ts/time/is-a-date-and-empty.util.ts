import { TO_NUMBER } from '../convert/to-number.util.js'

/** CHECK (is an invalid `Date` instance) */
export function IS_A_DATE_AND_EMPTY (o: any): o is Date {
  return (o instanceof Date) && ((TO_NUMBER(o) - TO_NUMBER(o)) !== 0)
}
