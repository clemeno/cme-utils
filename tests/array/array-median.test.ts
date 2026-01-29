import { describe, expect, it } from 'bun:test'
import { ARRAY_MEDIAN } from '../../ts/array/array-median.util.js'

describe(
  'ARRAY_MEDIAN',
  () => {
    const testCases = [
      { name: 'empty array', input: [], expected: NaN, isNaN: true },
      { name: 'odd-length arrays', input: [1, 3, 5], expected: 3, isNaN: false },
      { name: 'even-length arrays', input: [1, 2, 3, 4], expected: 3.5, isNaN: false },
      { name: 'single element array', input: [42], expected: 42, isNaN: false },
      { name: 'arrays with duplicate values', input: [2, 2, 2, 2, 2], expected: 2, isNaN: false },
      { name: 'floating point numbers', input: [1.5, 2.5, 3.5, 4.5], expected: 4, isNaN: false },
      { name: 'negative numbers', input: [-5, -1, -3, -9, -7], expected: -5, isNaN: false },
      { name: 'mixed positive and negative numbers', input: [-3, 1, -1, 3, 0], expected: 0, isNaN: false },
      { name: 'string numeric values', input: ['1', '2', '3', '4'], expected: 3.5, isNaN: false },
      { name: 'mixed string and number values', input: [1, '2', 3, '4'], expected: 3.5, isNaN: false },
      { name: 'unsorted arrays', input: [5, 1, 9, 3, 7], expected: 5, isNaN: false },
      { name: 'very large numbers', input: [1000000, 5000000, 3000000], expected: 3000000, isNaN: false },
      { name: 'very small numbers', input: [0.000001, 0.000003, 0.000002], expected: 0.000002, isNaN: false },
      { name: 'arrays with zeros', input: [0, -1, 1, 2], expected: 1.5, isNaN: false },
      { name: 'large even-length arrays', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], expected: 6.5, isNaN: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected, isNaN }) => {
        const result = ARRAY_MEDIAN(input)
        if (isNaN) {
          expect(result).toBeNaN()
        } else {
          expect(result).toBe(expected)
        }
      }
    )
  }
)
