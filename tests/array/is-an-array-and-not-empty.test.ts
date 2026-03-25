import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY_AND_NOT_EMPTY } from '../../ts/array/is-an-array-and-not-empty.util.js'

describe(
  'IS_AN_ARRAY_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { name: '[1]', input: [1], expected: true },
      { name: '[1,2,3]', input: [1, 2, 3], expected: true },
      { name: '["a"]', input: ['a'], expected: true },
      { name: '[{}]', input: [{}], expected: true },
      { name: '[]', input: [], expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'true', input: true, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_ARRAY_AND_NOT_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
