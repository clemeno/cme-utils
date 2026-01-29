import { describe, expect, it } from 'bun:test'
import { ARRAY_AVERAGE } from '../../ts/array/array-average.util.js'

describe(
  'ARRAY_AVERAGE',
  () => {
    const testCases = [
      { name: 'empty array', input: [], expected: NaN, isNaN: true },
      { name: 'array with no numeric values', input: ['a', 'b', 'c'], expected: NaN, isNaN: true },
      { name: 'positive numbers', input: [1, 2, 3, 4], expected: 2.5, isNaN: false },
      { name: 'negative numbers', input: [-1, -2, -3, -4], expected: -2.5, isNaN: false },
      { name: 'mixed positive and negative numbers', input: [1, -2, 3, -4], expected: -0.5, isNaN: false },
      { name: 'floating point numbers', input: [1.5, 2.25, 3.75], expected: 2.5, isNaN: false },
      { name: 'ignore non-numeric values', input: [1, 'a', 3, 'b', 5], expected: 3, isNaN: false },
      { name: 'NaN values in array', input: [1, NaN, 3, 5], expected: 3, isNaN: false },
      { name: 'single element array', input: [42], expected: 42, isNaN: false },
      { name: 'string numeric values', input: ['1', '2', '3'], expected: 2, isNaN: false },
      { name: 'mixed string and number values', input: [1, '2', 3.5, '4.5'], expected: 2.75, isNaN: false },
      { name: 'zero values', input: [0, 0, 0, 0], expected: 0, isNaN: false },
      { name: 'very large numbers', input: [1000000, 2000000, 3000000], expected: 2000000, isNaN: false },
      { name: 'very small numbers', input: [0.000001, 0.000002, 0.000003], expected: 0.000002, isNaN: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected, isNaN }) => {
        const result = ARRAY_AVERAGE(input)
        if (isNaN) {
          expect(result).toBeNaN()
        } else {
          expect(result).toBe(expected)
        }
      }
    )
  }
)
