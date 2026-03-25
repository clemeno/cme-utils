import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_EMPTY } from '../../ts/object/is-an-object-and-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_EMPTY',
  () => {
    const testCases = [
      { name: '{}', input: {}, expected: true },
      { name: '[] (no enumerable keys)', input: [], expected: true },
      { name: 'new Set() (no enumerable keys)', input: new Set(), expected: true },
      { name: 'new Map() (no enumerable keys)', input: new Map(), expected: true },
      { name: 'new Date() (no enumerable keys)', input: new Date(), expected: true },
      { name: '{ a: 1 }', input: { a: 1 }, expected: false },
      { name: '{ key: "value" }', input: { key: 'value' }, expected: false },
      { name: 'null', input: null, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'true', input: true, expected: false },
      { name: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT_AND_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT_AND_EMPTY(input)).toBe(expected)
      }
    )
  }
)
