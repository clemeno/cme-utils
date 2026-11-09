import { describe, expect, it } from 'bun:test'
import { ARRAY_AVERAGE } from '../../ts/array/array-average.util.js'

describe(
  'ARRAY_AVERAGE',
  () => {
    const nanTestCases: Array<{ name: string, input: Array<string | number> }> = [
      { name: 'empty array', input: [] },
      { name: 'array with no numeric values', input: ['a', 'b', 'c'] },
    ]

    it.each(nanTestCases)(
      '$name',
      ({ input }) => {
        expect(ARRAY_AVERAGE(input)).toBeNaN()
      }
    )

    const testCases: Array<{ name: string, input: Array<string | number>, expected: number }> = [
      { name: 'positive numbers', input: [1, 2, 3, 4], expected: 2.5 },
      { name: 'negative numbers', input: [-1, -2, -3, -4], expected: -2.5 },
      { name: 'mixed positive and negative numbers', input: [1, -2, 3, -4], expected: -0.5 },
      { name: 'floating point numbers', input: [1.5, 2.25, 3.75], expected: 2.5 },
      { name: 'ignore non-numeric values', input: [1, 'a', 3, 'b', 5], expected: 3 },
      { name: 'NaN values in array', input: [1, NaN, 3, 5], expected: 3 },
      { name: 'single element array', input: [42], expected: 42 },
      { name: 'string numeric values', input: ['1', '2', '3'], expected: 2 },
      { name: 'mixed string and number values', input: [1, '2', 3.5, '4.5'], expected: 2.75 },
      { name: 'zero values', input: [0, 0, 0, 0], expected: 0 },
      { name: 'very large numbers', input: [1000000, 2000000, 3000000], expected: 2000000 },
      { name: 'very small numbers', input: [0.000001, 0.000002, 0.000003], expected: 0.000002 },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(ARRAY_AVERAGE(input)).toBe(expected)
      }
    )
  }
)
