import { describe, expect, it } from 'bun:test'
import { ARRAY_MAX } from '../../ts/array/array-max.util.js'

describe(
  'ARRAY_MAX',
  () => {
    // ! boolean values like [false, true] are not tested because boolean is not a valid input type for ARRAY_MAX
    const testCases: Array<{ name: string, input: unknown[], expected: undefined | number | string }> = [
      { name: 'empty array', input: [], expected: undefined },
      { name: 'array with only null and undefined values', input: [null, undefined, null], expected: undefined },
      { name: 'positive numbers', input: [1, 5, 3, 9, 2], expected: 9 },
      { name: 'negative numbers', input: [-5, -1, -9, -3], expected: -1 },
      { name: 'mixed positive and negative numbers', input: [-5, 10, -3, 8, 0], expected: 10 },
      { name: 'floating point numbers', input: [1.5, 3.7, 2.1, 4.9, 0.8], expected: 4.9 },
      { name: 'lexicographically maximum string', input: ['apple', 'zebra', 'banana', 'cherry'], expected: 'zebra' },
      { name: 'mixed string and number types', input: [1, 'apple', 5, 'zebra'], expected: 5 },
      { name: 'ignore null and undefined values', input: [1, null, 5, undefined, 3], expected: 5 },
      { name: 'single element array', input: [42], expected: 42 },
      { name: 'arrays with duplicate maximum values', input: [5, 3, 5, 1, 5], expected: 5 },
      { name: 'arrays with only one valid value', input: [null, 42, undefined], expected: 42 },
      { name: 'very large numbers', input: [1000000, 5000000, 3000000], expected: 5000000 },
      { name: 'very small numbers', input: [-0.000001, 0.000002, -0.000003], expected: 0.000002 },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(ARRAY_MAX(input)).toBe(expected)
      }
    )
  }
)
