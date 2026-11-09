import { TO_NUMBER } from '../convert/to-number.util.js'

function IS_NOT_EMPTY (_: any): _ is any {
  const bNotNull = _ !== null
  const bNotUndefined = typeof _ !== 'undefined'
  const bObject = typeof _ === 'object'
  const bNumber = typeof _ === 'number'
  const bString = typeof _ === 'string'
  const bArray = Array.isArray(_)
  const bSet = _ instanceof Set
  const bMap = _ instanceof Map
  const bDate = _ instanceof Date
  return (
    bNotNull && bNotUndefined && // IS_SET(_) &&
    (
      (bNumber && !isNaN(_)) || // IS_A_NUMBER(_) ||
      (bString && (_ !== '')) || // IS_A_STRING_AND_NOT_EMPTY(_) ||
      (bArray && (_.length !== 0)) || // IS_AN_ARRAY_AND_NOT_EMPTY(_) ||
      (bSet && (_.size !== 0)) || // IS_A_SET_AND_NOT_EMPTY(_) ||
      (bMap && (_.size !== 0)) || // IS_A_MAP_AND_NOT_EMPTY(_) ||
      (bDate && !isNaN(TO_NUMBER(_))) || // IS_A_DATE_AND_NOT_EMPTY() ||
      (bObject && !bNumber && !bString && !bArray && !bSet && !bMap && !bDate && (Object.keys(_ as Record<any, any>).length !== 0))
      // IS_AN_OBJECT_AND_NOT_EMPTY(_)
    )
  )
}

/**
 * CHECK (is empty): `null`, `undefined`, `NaN`, an empty string, array, Set, Map or object, or an invalid Date
 * @param v - The value to check
 * @returns `true` when `v` is empty; numbers (even `0`), booleans and non-empty containers are not empty
 * @example
 * ```typescript
 * IS_EMPTY(null) // returns true
 * IS_EMPTY('') // returns true
 * IS_EMPTY([]) // returns true
 * IS_EMPTY({}) // returns true
 * IS_EMPTY(0) // returns false
 * IS_EMPTY([0]) // returns false
 * IS_EMPTY({ a: 1 }) // returns false
 * ```
 */
export function IS_EMPTY (v: any): boolean {
  return !IS_NOT_EMPTY(v)
}
