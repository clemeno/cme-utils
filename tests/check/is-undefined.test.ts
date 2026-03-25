import { describe, expect, it } from 'bun:test'
import { IS_UNDEFINED } from '../../ts/check/is-undefined.util.js'

describe(
  'IS_UNDEFINED',
  () => {
    const testCases = [
      { name: 'undefined', input: undefined, expected: true },
      { name: 'null', input: null, expected: false },
      { name: '0', input: 0, expected: false },
      { name: '""', input: '', expected: false },
      { name: 'false', input: false, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: '[]', input: [], expected: false },
    ]

    it.each(testCases)(
      'IS_UNDEFINED($name) → $expected',
      ({ input, expected }) => {
        expect(IS_UNDEFINED(input)).toBe(expected)
      }
    )
  }
)
