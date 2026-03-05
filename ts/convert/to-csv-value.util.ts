import { IS_A_NUMBER } from '../check/is-a-number.util.js'
import { IS_A_STRING } from '../string/is-a-string.util.js'
import { IS_SET } from '../check/is-set.util.js'

/**
 * Converts any value to a CSV-safe string representation.
 * Handles different types appropriately for CSV export.
 * @param v - Value to convert for CSV output
 * @returns CSV-safe string representation
 * @example
 * ```typescript
 * TO_CSV_VALUE(42) // returns '42'
 * TO_CSV_VALUE('Hello, World') // returns '"Hello, World"' (quoted)
 * TO_CSV_VALUE({toString: () => 'custom'}) // returns '"custom"' (quoted)
 * TO_CSV_VALUE(null) // returns ''
 * ```
 */
export const TO_CSV_VALUE = (v: any): string => {
  let res: string = ''

  if (IS_SET(v)) {
    if (IS_A_NUMBER(v)) {
      res = v.toString()
    } else if (IS_A_STRING(v)) {
      // Quote strings to handle commas and special characters
      res = JSON.stringify(v)
    } else {
      // ! All objects have toString in standard JS so we can:
      // Convert the object to its string representation, then quote using JSON
      res = JSON.stringify(v.toString())
    }
  }

  return res
}
