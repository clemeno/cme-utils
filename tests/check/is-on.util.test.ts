import { describe, expect, it } from 'bun:test'
import { IS_ON } from '../../ts/check/is-on.util.js'

describe(
  'IS_ON',
  () => {
    const testCases = [
      { label: 'true', input: true, expected: true },
      { label: '1', input: 1, expected: true },
      { label: '-1', input: -1, expected: true },
      { label: '"hello"', input: 'hello', expected: true },
      { label: '"0"', input: '0', expected: true },
      { label: '"false"', input: 'false', expected: true },
      { label: '[]', input: [], expected: true },
      { label: '{}', input: {}, expected: true },
      { label: 'new Date()', input: new Date(), expected: true },
      { label: 'false', input: false, expected: false },
      { label: '0', input: 0, expected: false },
      { label: '""', input: '', expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_ON($label) → $expected',
      ({ input, expected }) => {
        expect(IS_ON(input)).toBe(expected)
      }
    )
  }
)
