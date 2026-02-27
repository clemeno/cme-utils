import { describe, expect, it } from 'bun:test'
import { IS_UNDEFINED } from '../../ts/check/is-undefined.util.js'

describe(
  'IS_UNDEFINED',
  () => {
    const testCases = [
      { label: 'undefined', input: undefined, expected: true },
      { label: 'null', input: null, expected: false },
      { label: '0', input: 0, expected: false },
      { label: '""', input: '', expected: false },
      { label: 'false', input: false, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '[]', input: [], expected: false },
    ]

    it.each(testCases)(
      'IS_UNDEFINED($label) → $expected',
      ({ input, expected }) => {
        expect(IS_UNDEFINED(input)).toBe(expected)
      }
    )
  }
)
