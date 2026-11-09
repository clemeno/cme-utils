import { describe, expect, it } from 'bun:test'
import { ARRAY_MIN_MAX } from '../../ts/array/array-min-max.util.js'
describe(
  'ARRAY_MIN_MAX',
  () => {
    // ! boolean values like [false, true, false] are not tested because boolean is not a valid input type for ARRAY_MAX
    const testCases: Array<{ name: string, input: unknown[], expected: { min: number | string | undefined, max: number | string | undefined } }> = [
      { name: 'empty array', input: [], expected: { min: undefined, max: undefined } },
      { name: 'array with only null and undefined values', input: [null, undefined, null], expected: { min: undefined, max: undefined } },
      { name: 'positive numbers', input: [5, 1, 9, 3, 7], expected: { min: 1, max: 9 } },
      { name: 'negative numbers', input: [-1, -5, -3, -9], expected: { min: -9, max: -1 } },
      { name: 'mixed positive and negative numbers', input: [-5, 10, -3, 8, 0], expected: { min: -5, max: 10 } },
      { name: 'floating point numbers', input: [3.7, 1.5, 4.9, 2.1, 0.8], expected: { min: 0.8, max: 4.9 } },
      { name: 'lexicographically min and max strings', input: ['zebra', 'apple', 'cherry', 'banana'], expected: { min: 'apple', max: 'zebra' } },
      { name: 'mixed string and number types', input: [5, 'apple', 1, 'zebra'], expected: { min: 1, max: 5 } },
      { name: 'ignore null and undefined values', input: [5, null, 1, undefined, 3], expected: { min: 1, max: 5 } },
      { name: 'single element array', input: [42], expected: { min: 42, max: 42 } },
      { name: 'arrays with duplicate values', input: [3, 5, 3, 7, 3], expected: { min: 3, max: 7 } },
      { name: 'arrays with only one valid value', input: [null, 42, undefined], expected: { min: 42, max: 42 } },
      { name: 'very large numbers', input: [5000000, 1000000, 3000000], expected: { min: 1000000, max: 5000000 } },
      { name: 'very small numbers', input: [0.000002, -0.000001, -0.000003], expected: { min: -0.000003, max: 0.000002 } },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(ARRAY_MIN_MAX(input)).toEqual(expected)
      }
    )
  }
)
