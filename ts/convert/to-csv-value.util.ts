import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_A_NUMBER } from '../check/is-a-number.util.js'
import { IS_A_STRING } from '../check/is-a-string.util.js'
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
    } else if (IS_A_FUNCTION(v.toString)) {
      // Convert objects to string representation, then quote
      res = JSON.stringify(v.toString())
    } else {
      res = v
    }
  }

  return res
}
