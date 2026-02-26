import { describe, expect, it } from 'bun:test'
import { ARRAY_LIKE_10_TO_ARRAY_16 } from '../../ts/convert/array-like-10-to-array-16.util.js'

describe(
  'ARRAY_LIKE_10_TO_ARRAY_16',
  () => {
    const testCases = [
      { name: 'empty array', input: [], expected: [] },
      { name: '[0]', input: [0], expected: ['0'] },
      { name: '[10] → ["a"]', input: [10], expected: ['a'] },
      { name: '[255] → ["ff"]', input: [255], expected: ['ff'] },
      { name: '[256] → ["100"]', input: [256], expected: ['100'] },
      { name: '[0, 10, 255]', input: [0, 10, 255], expected: ['0', 'a', 'ff'] },
      { name: '[15, 16, 256]', input: [15, 16, 256], expected: ['f', '10', '100'] },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(ARRAY_LIKE_10_TO_ARRAY_16(input)).toEqual(expected)
      }
    )

    it(
      'null input returns empty array',
      () => {
        expect(ARRAY_LIKE_10_TO_ARRAY_16(null)).toEqual([])
      }
    )
  }
)
