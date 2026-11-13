import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_NOT_EMPTY } from '../../ts/object/is-an-object-and-not-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_NOT_EMPTY',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: '{ a: 1 }', input: { a: 1 }, expected: true },
      { name: '{ key: "value" }', input: { key: 'value' }, expected: true },
      { name: '{ x: 1, y: 2 }', input: { x: 1, y: 2 }, expected: true },
      { name: '[1,2,3] (indices are keys)', input: [1, 2, 3], expected: true },
      { name: '{}', input: {}, expected: false },
      { name: '[] (no keys)', input: [], expected: false },
      { name: 'new Set()', input: new Set(), expected: false },
      { name: 'new Set([1])', input: new Set([1]), expected: false },
      { name: 'new Map()', input: new Map(), expected: false },
      { name: 'new Map([["key","value"]])', input: new Map([['key', 'value']]), expected: false },
      { name: 'new Date()', input: new Date(), expected: false },
      { name: 'null', input: null, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'true', input: true, expected: false },
      { name: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT_AND_NOT_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
