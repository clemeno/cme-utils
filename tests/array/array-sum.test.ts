import { describe, expect, it } from 'bun:test'
import { ARRAY_SUM } from '../../ts/array/array-sum.util.js'

describe(
  'ARRAY_SUM',
  () => {
    const nanTestCases: Array<{ name: string, input: Array<string | number> }> = [
      { name: 'empty array', input: [] },
      { name: 'array with no numeric values', input: ['a', 'b', 'c'] },
    ]

    it.each(nanTestCases)(
      '$name',
      ({ input }) => {
        expect(ARRAY_SUM(input)).toBeNaN()
      }
    )

    const testCases: Array<{ name: string, input: Array<string | number>, expected: number }> = [
      { name: 'positive numbers', input: [1, 2, 3], expected: 6 },
      { name: 'negative numbers', input: [-1, -2, -3], expected: -6 },
      { name: 'mixed positive and negative numbers', input: [1, -2, 3], expected: 2 },
      { name: 'floating point numbers', input: [-1.75, 2.5, -2.25], expected: -1.5 },
      { name: 'ignore non-numeric values', input: [1, 'a', 3], expected: 4 },
      { name: 'NaN values in array', input: [1, NaN, 3], expected: 4 },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(ARRAY_SUM(input)).toBe(expected)
      }
    )
  }
)
