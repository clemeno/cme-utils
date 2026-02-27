import { describe, expect, it } from 'bun:test'
import { IS_EMPTY } from '../../ts/check/is-empty.util.js'

describe(
  'IS_EMPTY',
  () => {
    const testCases = [
      { label: 'null', input: null, expected: true },
      { label: 'undefined', input: undefined, expected: true },
      { label: 'NaN', input: NaN, expected: true },
      { label: '""', input: '', expected: true },
      { label: '[]', input: [], expected: true },
      { label: 'new Set()', input: new Set(), expected: true },
      { label: 'new Map()', input: new Map(), expected: true },
      { label: 'new Date("invalid")', input: new Date('invalid'), expected: true },
      { label: 'new Date(NaN)', input: new Date(NaN), expected: true },
      { label: '{}', input: {}, expected: true },
      { label: '0', input: 0, expected: false },
      { label: '123', input: 123, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '[1]', input: [1], expected: false },
      { label: 'new Set([1])', input: new Set([1]), expected: false },
      { label: 'new Map([["key","value"]])', input: new Map([['key', 'value']]), expected: false },
      { label: 'new Date()', input: new Date(), expected: false },
      { label: '{ a: 1 }', input: { a: 1 }, expected: false },
    ]

    it.each(testCases)(
      'IS_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_EMPTY(input)).toBe(expected)
      }
    )
  }
)
