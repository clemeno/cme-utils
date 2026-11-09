import { describe, expect, it } from 'bun:test'
import { ARRAY_MEDIAN } from '../../ts/array/array-median.util.js'

describe(
  'ARRAY_MEDIAN',
  () => {
    const testCases: Array<{ name: string, input: number[] | string[] | (string | number)[], expected: number }> = [
      { name: 'empty array', input: [], expected: NaN },
      { name: 'odd-length arrays', input: [1, 3, 5], expected: 3 },
      { name: 'even-length arrays', input: [1, 2, 3, 4], expected: 2.5 },
      { name: 'even-length example of the JSDoc: (3 + 5) / 2', input: [1, 3, 5, 7], expected: 4 },
      { name: 'single element array', input: [42], expected: 42 },
      { name: 'arrays with duplicate values', input: [2, 2, 2, 2, 2], expected: 2 },
      { name: 'floating point numbers', input: [1.5, 2.5, 3.5, 4.5], expected: 3 },
      { name: 'negative numbers', input: [-5, -1, -3, -9, -7], expected: -5 },
      { name: 'mixed positive and negative numbers', input: [-3, 1, -1, 3, 0], expected: 0 },
      { name: 'string numeric values', input: ['1', '2', '3', '4'], expected: 2.5 },
      { name: 'mixed string and number values', input: [1, '2', 3, '4'], expected: 2.5 },
      { name: 'unsorted arrays', input: [5, 1, 9, 3, 7], expected: 5 },
      { name: 'very large numbers', input: [1000000, 5000000, 3000000], expected: 3000000 },
      { name: 'very small numbers', input: [0.000001, 0.000003, 0.000002], expected: 0.000002 },
      { name: 'arrays with zeros', input: [0, -1, 1, 2], expected: 0.5 },
      { name: 'large even-length arrays', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], expected: 5.5 },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        // toBe compares with Object.is, so NaN matches NaN
        expect(ARRAY_MEDIAN(input)).toBe(expected)
      }
    )
  }
)
