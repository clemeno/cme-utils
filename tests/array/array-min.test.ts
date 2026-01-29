import { describe, expect, it } from 'bun:test'
import { ARRAY_MIN } from '../../ts/array/array-min.util.js'
describe(
  'ARRAY_MIN',
  () => {
    // ! boolean values like [false, true, false] are not tested because boolean is not a valid input type for ARRAY_MAX
    const testCases = [
      { name: 'empty array', input: [], expected: undefined, isUndefined: true },
      { name: 'array with only null and undefined values', input: [null, undefined, null], expected: undefined, isUndefined: true },
      { name: 'positive numbers', input: [5, 1, 9, 3, 7], expected: 1, isUndefined: false },
      { name: 'negative numbers', input: [-1, -5, -3, -9], expected: -9, isUndefined: false },
      { name: 'mixed positive and negative numbers', input: [-5, 10, -3, 8, 0], expected: -5, isUndefined: false },
      { name: 'floating point numbers', input: [3.7, 1.5, 4.9, 2.1, 0.8], expected: 0.8, isUndefined: false },
      { name: 'lexicographically minimum string', input: ['zebra', 'apple', 'cherry', 'banana'], expected: 'apple', isUndefined: false },
      { name: 'mixed string and number types', input: [5, 'apple', 1, 'zebra'], expected: 1, isUndefined: false },
      { name: 'ignore null and undefined values', input: [5, null, 1, undefined, 3], expected: 1, isUndefined: false },
      { name: 'single element array', input: [42], expected: 42, isUndefined: false },
      { name: 'arrays with duplicate minimum values', input: [3, 5, 3, 7, 3], expected: 3, isUndefined: false },
      { name: 'arrays with only one valid value', input: [null, 42, undefined], expected: 42, isUndefined: false },
      { name: 'very large numbers', input: [5000000, 1000000, 3000000], expected: 1000000, isUndefined: false },
      { name: 'very small numbers', input: [0.000002, -0.000001, -0.000003], expected: -0.000003, isUndefined: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected, isUndefined }) => {
        const result = ARRAY_MIN(input)
        if (isUndefined) {
          expect(result).toBeUndefined()
        } else {
          expect(result).toBe(expected)
        }
      }
    )
  }
)
