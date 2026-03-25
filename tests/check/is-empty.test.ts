import { describe, expect, it } from 'bun:test'
import { IS_EMPTY } from '../../ts/check/is-empty.util.js'

describe(
  'IS_EMPTY',
  () => {
    const testCases = [
      { name: 'null', input: null, expected: true },
      { name: 'undefined', input: undefined, expected: true },
      { name: 'NaN', input: NaN, expected: true },
      { name: '""', input: '', expected: true },
      { name: '[]', input: [], expected: true },
      { name: 'new Set()', input: new Set(), expected: true },
      { name: 'new Map()', input: new Map(), expected: true },
      { name: 'new Date("invalid")', input: new Date('invalid'), expected: true },
      { name: 'new Date(NaN)', input: new Date(NaN), expected: true },
      { name: '{}', input: {}, expected: true },
      { name: '0', input: 0, expected: false },
      { name: '123', input: 123, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '[1]', input: [1], expected: false },
      { name: 'new Set([1])', input: new Set([1]), expected: false },
      { name: 'new Map([["key","value"]])', input: new Map([['key', 'value']]), expected: false },
      { name: 'new Date()', input: new Date(), expected: false },
      { name: '{ a: 1 }', input: { a: 1 }, expected: false },
    ]

    it.each(testCases)(
      'IS_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_EMPTY(input)).toBe(expected)
      }
    )
  }
)
