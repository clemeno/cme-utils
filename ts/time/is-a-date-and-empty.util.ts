import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * CHECK (is an invalid `Date` instance)
 * @param o - The value to check
 * @returns `true` when `o` is a `Date` whose time is `NaN`
 * @example
 * ```typescript
 * IS_A_DATE_AND_EMPTY(new Date('invalid')) // returns true
 * IS_A_DATE_AND_EMPTY(new Date(0)) // returns false
 * IS_A_DATE_AND_EMPTY(null) // returns false
 * ```
 */
export function IS_A_DATE_AND_EMPTY (o: any): o is Date {
  return (o instanceof Date) && ((TO_NUMBER(o) - TO_NUMBER(o)) !== 0)
}
