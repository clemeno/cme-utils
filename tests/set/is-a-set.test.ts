import { describe, expect, it } from 'bun:test'
import { IS_A_SET } from '../../ts/set/is-a-set.util.js'

describe(
  'IS_A_SET',
  () => {
    const testCases = [
      { label: 'new Set()', input: new Set(), expected: true },
      { label: 'new Set([1,2,3])', input: new Set([1, 2, 3]), expected: true },
      { label: 'new Set(["a","b"])', input: new Set(['a', 'b']), expected: true },
      { label: '[]', input: [], expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'true', input: true, expected: false },
      { label: 'new Map()', input: new Map(), expected: false },
      { label: 'new Date()', input: new Date(), expected: false },
    ]

    it.each(testCases)(
      'IS_A_SET($label) → $expected',
      ({ input, expected }) => {
        expect(IS_A_SET(input)).toBe(expected)
      }
    )
  }
)
