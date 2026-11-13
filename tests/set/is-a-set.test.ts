import { describe, expect, it } from 'bun:test'
import { IS_A_SET } from '../../ts/set/is-a-set.util.js'

describe(
  'IS_A_SET',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: 'new Set()', input: new Set(), expected: true },
      { name: 'new Set([1,2,3])', input: new Set([1, 2, 3]), expected: true },
      { name: 'new Set(["a","b"])', input: new Set(['a', 'b']), expected: true },
      { name: '[]', input: [], expected: false },
      { name: '{}', input: {}, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'true', input: true, expected: false },
      { name: 'new Map()', input: new Map(), expected: false },
      { name: 'new Date()', input: new Date(), expected: false },
    ]

    it.each(testCases)(
      'IS_A_SET($name) → $expected',
      ({ input, expected }) => {
        expect(IS_A_SET(input)).toBe(expected)
      }
    )
  }
)
