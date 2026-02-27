import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY_AND_NOT_EMPTY } from '../../ts/check/is-an-array-and-not-empty.util.js'

describe(
  'IS_AN_ARRAY_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { label: '[1]', input: [1], expected: true },
      { label: '[1,2,3]', input: [1, 2, 3], expected: true },
      { label: '["a"]', input: ['a'], expected: true },
      { label: '[{}]', input: [{}], expected: true },
      { label: '[]', input: [], expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'true', input: true, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_ARRAY_AND_NOT_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
