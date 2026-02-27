import { describe, expect, it } from 'bun:test'
import { IS_SET } from '../../ts/check/is-set.util.js'

describe(
  'IS_SET',
  () => {
    const testCases = [
      { label: '0', input: 0, expected: true },
      { label: 'false', input: false, expected: true },
      { label: '""', input: '', expected: true },
      { label: '[]', input: [], expected: true },
      { label: '{}', input: {}, expected: true },
      { label: 'NaN', input: NaN, expected: true },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_SET($label) → $expected',
      ({ input, expected }) => {
        expect(IS_SET(input)).toBe(expected)
      }
    )
  }
)
