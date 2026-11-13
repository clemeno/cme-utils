import { describe, expect, it } from 'bun:test'
import { IS_SET } from '../../ts/check/is-set.util.js'

describe(
  'IS_SET',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: '0', input: 0, expected: true },
      { name: 'false', input: false, expected: true },
      { name: '""', input: '', expected: true },
      { name: '[]', input: [], expected: true },
      { name: '{}', input: {}, expected: true },
      { name: 'NaN', input: NaN, expected: true },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_SET($name) → $expected',
      ({ input, expected }) => {
        expect(IS_SET(input)).toBe(expected)
      }
    )
  }
)
