import { describe, expect, it } from 'bun:test'
import { IS_NULL } from '../../ts/check/is-null.util.js'

describe(
  'IS_NULL',
  () => {
    const testCases = [
      { label: 'null', input: null, expected: true },
      { label: 'undefined', input: undefined, expected: false },
      { label: '0', input: 0, expected: false },
      { label: '""', input: '', expected: false },
      { label: 'false', input: false, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '[]', input: [], expected: false },
    ]

    it.each(testCases)(
      'IS_NULL($label) → $expected',
      ({ input, expected }) => {
        expect(IS_NULL(input)).toBe(expected)
      }
    )
  }
)
