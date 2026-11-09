import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * CHECK (is a valid `Date` instance)
 * @param o - The value to check
 * @returns `true` when `o` is a `Date` holding a valid time
 * @example
 * ```typescript
 * IS_A_DATE_AND_NOT_EMPTY(new Date(0)) // returns true
 * IS_A_DATE_AND_NOT_EMPTY(new Date('invalid')) // returns false
 * IS_A_DATE_AND_NOT_EMPTY('2024-01-01') // returns false
 * ```
 */
export function IS_A_DATE_AND_NOT_EMPTY (o: any): o is Date {
  return (o instanceof Date) && ((TO_NUMBER(o) - TO_NUMBER(o)) === 0)
}
