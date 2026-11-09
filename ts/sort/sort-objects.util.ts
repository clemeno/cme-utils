import type { bool } from '../bool.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

// eslint-disable-next-line max-params
export type ANY_SORT_FUNCTION_TYPE = (a: any, b: any) => number

/**
 * Creates a comparator function for sorting objects by a specified property.
 * Handles both ascending/descending order and numeric vs string comparison.
 * @param _ - Configuration object
 * @param _.on - Function to extract the sort key from each object
 * @param _.order - Sort order: 'desc' for descending, undefined for ascending
 * @param _.bPureNumeric - If true, assumes all values are numbers for performance
 * @returns A comparator function suitable for Array.sort()
 * @example
 * ```typescript
 * const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * // Sort by age ascending
 * [...users].sort(SORT_OBJECTS({ on: u => u.age })) // returns [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * // Sort by name descending
 * [...users].sort(SORT_OBJECTS({ on: u => u.name, order: 'desc' })) // returns [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }]
 * // Pure numeric sorting (faster)
 * [...users].sort(SORT_OBJECTS({ on: u => u.age, order: 'desc', bPureNumeric: true })) // returns [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }]
 * // Numeric strings compare as numbers: '10' sorts after '9'
 * [{ v: '10' }, { v: '9' }].sort(SORT_OBJECTS({ on: x => x.v })) // returns [{ v: '9' }, { v: '10' }]
 * // Equal keys compare as 0
 * SORT_OBJECTS({ on: x => x.v })({ v: 1 }, { v: 1 }) // returns 0
 * ```
 */
export function SORT_OBJECTS (_: { on: (x: any) => any, order?: any, bPureNumeric?: bool }): ANY_SORT_FUNCTION_TYPE {
  let res: ANY_SORT_FUNCTION_TYPE

  // Handle descending order with different logic for pure numeric vs mixed types
  if (_.order === 'desc') {
    if (IS_ON(_.bPureNumeric)) {
      // Pure numeric: simple reverse subtraction for performance
      // eslint-disable-next-line max-params
      res = (a, b) => TO_NUMBER(_.on(b)) - TO_NUMBER(_.on(a))
    } else {
      // Mixed types: handle numeric strings by converting, otherwise lexicographic
      // eslint-disable-next-line max-params
      res = (a, b) => {
        const onA = _.on(a)
        const va = IS_NUMERIC(onA) ? TO_NUMBER(onA) : onA

        const onB = _.on(b)
        const vb = IS_NUMERIC(onB) ? TO_NUMBER(onB) : onB

        return (va < vb) ? 1 : ((vb < va) ? -1 : 0)
      }
    }
  } else if (IS_ON(_.bPureNumeric)) {
    // Ascending pure numeric: direct subtraction
    // eslint-disable-next-line max-params
    res = (a, b) => TO_NUMBER(_.on(a)) - TO_NUMBER(_.on(b))
  } else {
    // Ascending mixed types: same logic as descending but reversed comparison
    // eslint-disable-next-line max-params
    res = (a, b) => {
      const onA = _.on(a)
      const va = IS_NUMERIC(onA) ? TO_NUMBER(onA) : onA

      const onB = _.on(b)
      const vb = IS_NUMERIC(onB) ? TO_NUMBER(onB) : onB

      return (vb < va) ? 1 : ((va < vb) ? -1 : 0)
    }
  }
  return res
}
