import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY_AND_EMPTY } from '../../ts/array/is-an-array-and-empty.util.js'

describe(
  'IS_AN_ARRAY_AND_EMPTY',
  () => {
    const testCases = [
      { name: '[]', input: [], expected: true },
      { name: '[1]', input: [1], expected: false },
      { name: '[1,2,3]', input: [1, 2, 3], expected: false },
      { name: '["a"]', input: ['a'], expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'true', input: true, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_ARRAY_AND_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_ARRAY_AND_EMPTY(input)).toBe(expected)
      }
    )
  }
)
