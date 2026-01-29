/**
 * Converts any value to a number with comprehensive type handling.
 * Handles primitives, objects with valueOf(), and string parsing with validation.
 * @param v - Value to convert to number
 * @returns The numeric representation, or NaN if conversion fails
 * @example
 * ```typescript
 * TO_NUMBER(42) // returns 42
 * TO_NUMBER('123') // returns 123
 * TO_NUMBER('123abc') // returns NaN (invalid string)
 * TO_NUMBER(true) // returns 1
 * TO_NUMBER(new Date()) // returns timestamp
 * TO_NUMBER(null) // returns NaN
 * ```
 */
export const TO_NUMBER = (v: any): number => {
  let res = NaN

  if (typeof v === 'number') {
    res = v
  } else if (typeof v === 'boolean') {
    res = v ? 1 : 0
  } else if (typeof v === 'bigint') {
    res = Number(v)
  } else if (typeof v === 'string') {
    const a = Number(v)
    const b = Number.parseFloat(v)

    // Only accept strings that parse to valid numbers (reject '123abc')
    res = (a === b) ? a : NaN
  } else if ((typeof v !== 'undefined') && (v !== null) && (typeof v.valueOf === 'function')) {
    // Try object's valueOf() method for objects with primitive values
    const valueOf = v.valueOf()

    if (typeof valueOf === 'number') {
      res = valueOf
    } else if (typeof valueOf === 'boolean') {
      res = valueOf ? 1 : 0
    } else if (typeof valueOf === 'bigint') {
      res = Number(valueOf)
    } else if (typeof valueOf === 'string') {
      const a = Number(valueOf)
      const b = Number.parseFloat(valueOf)

      res = (a === b) ? a : NaN
    }
  }

  return res
}
