import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_NOT_EMPTY } from '../../ts/check/is-an-object-and-not-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { label: '{ a: 1 }', input: { a: 1 }, expected: true },
      { label: '{ key: "value" }', input: { key: 'value' }, expected: true },
      { label: '{ x: 1, y: 2 }', input: { x: 1, y: 2 }, expected: true },
      { label: '[1,2,3] (indices are keys)', input: [1, 2, 3], expected: true },
      { label: '{}', input: {}, expected: false },
      { label: '[] (no keys)', input: [], expected: false },
      { label: 'new Set()', input: new Set(), expected: false },
      { label: 'new Set([1])', input: new Set([1]), expected: false },
      { label: 'new Map()', input: new Map(), expected: false },
      { label: 'new Map([["key","value"]])', input: new Map([['key', 'value']]), expected: false },
      { label: 'new Date()', input: new Date(), expected: false },
      { label: 'null', input: null, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'true', input: true, expected: false },
      { label: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT_AND_NOT_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
