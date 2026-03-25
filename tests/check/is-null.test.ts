import { describe, expect, it } from 'bun:test'
import { IS_NULL } from '../../ts/check/is-null.util.js'

describe(
  'IS_NULL',
  () => {
    const testCases = [
      { name: 'null', input: null, expected: true },
      { name: 'undefined', input: undefined, expected: false },
      { name: '0', input: 0, expected: false },
      { name: '""', input: '', expected: false },
      { name: 'false', input: false, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: '[]', input: [], expected: false },
    ]

    it.each(testCases)(
      'IS_NULL($name) → $expected',
      ({ input, expected }) => {
        expect(IS_NULL(input)).toBe(expected)
      }
    )
  }
)
