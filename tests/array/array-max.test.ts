import { describe, expect, it } from 'bun:test'
import { ARRAY_MAX } from '../../ts/array/array-max.util.js'

describe(
  'ARRAY_MAX',
  () => {
    // ! boolean values like [false, true] are not tested because boolean is not a valid input type for ARRAY_MAX
    const testCases = [
      { name: 'empty array', input: [], expected: undefined, isUndefined: true },
      { name: 'array with only null and undefined values', input: [null, undefined, null], expected: undefined, isUndefined: true },
      { name: 'positive numbers', input: [1, 5, 3, 9, 2], expected: 9, isUndefined: false },
      { name: 'negative numbers', input: [-5, -1, -9, -3], expected: -1, isUndefined: false },
      { name: 'mixed positive and negative numbers', input: [-5, 10, -3, 8, 0], expected: 10, isUndefined: false },
      { name: 'floating point numbers', input: [1.5, 3.7, 2.1, 4.9, 0.8], expected: 4.9, isUndefined: false },
      { name: 'lexicographically maximum string', input: ['apple', 'zebra', 'banana', 'cherry'], expected: 'zebra', isUndefined: false },
      { name: 'mixed string and number types', input: [1, 'apple', 5, 'zebra'], expected: 5, isUndefined: false },
      { name: 'ignore null and undefined values', input: [1, null, 5, undefined, 3], expected: 5, isUndefined: false },
      { name: 'single element array', input: [42], expected: 42, isUndefined: false },
      { name: 'arrays with duplicate maximum values', input: [5, 3, 5, 1, 5], expected: 5, isUndefined: false },
      { name: 'arrays with only one valid value', input: [null, 42, undefined], expected: 42, isUndefined: false },
      { name: 'very large numbers', input: [1000000, 5000000, 3000000], expected: 5000000, isUndefined: false },
      { name: 'very small numbers', input: [-0.000001, 0.000002, -0.000003], expected: 0.000002, isUndefined: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected, isUndefined }) => {
        const result = ARRAY_MAX(input)
        if (isUndefined) {
          expect(result).toBeUndefined()
        } else {
          expect(result).toBe(expected)
        }
      }
    )
  }
)
