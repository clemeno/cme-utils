import { describe, expect, it } from 'bun:test'
import { ARRAY_SUM } from '../../ts/array/array-sum.util.js'

describe(
  'ARRAY_SUM',
  () => {
    const testCases = [
      { name: 'empty array', input: [], expected: NaN, isNaN: true },
      { name: 'array with no numeric values', input: ['a', 'b', 'c'], expected: NaN, isNaN: true },
      { name: 'positive numbers', input: [1, 2, 3], expected: 6, isNaN: false },
      { name: 'negative numbers', input: [-1, -2, -3], expected: -6, isNaN: false },
      { name: 'mixed positive and negative numbers', input: [1, -2, 3], expected: 2, isNaN: false },
      { name: 'floating point numbers', input: [-1.75, 2.5, -2.25], expected: -1.5, isNaN: false },
      { name: 'ignore non-numeric values', input: [1, 'a', 3], expected: 4, isNaN: false },
      { name: 'NaN values in array', input: [1, NaN, 3], expected: 4, isNaN: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected, isNaN }) => {
        const result = ARRAY_SUM(input)
        if (isNaN) {
          expect(result).toBeNaN()
        } else {
          expect(result).toBe(expected)
        }
      }
    )
  }
)
