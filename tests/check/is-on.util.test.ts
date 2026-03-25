import { describe, expect, it } from 'bun:test'
import { IS_ON } from '../../ts/check/is-on.util.js'

describe(
  'IS_ON',
  () => {
    const testCases = [
      { name: 'true', input: true, expected: true },
      { name: '1', input: 1, expected: true },
      { name: '-1', input: -1, expected: true },
      { name: '"hello"', input: 'hello', expected: true },
      { name: '"0"', input: '0', expected: true },
      { name: '"false"', input: 'false', expected: true },
      { name: '[]', input: [], expected: true },
      { name: '{}', input: {}, expected: true },
      { name: 'new Date()', input: new Date(), expected: true },
      { name: 'false', input: false, expected: false },
      { name: '0', input: 0, expected: false },
      { name: '""', input: '', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_ON($name) → $expected',
      ({ input, expected }) => {
        expect(IS_ON(input)).toBe(expected)
      }
    )
  }
)
