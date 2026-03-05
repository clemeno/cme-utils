import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_EMPTY } from '../../ts/object/is-an-object-and-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_EMPTY',
  () => {
    const testCases = [
      { label: '{}', input: {}, expected: true },
      { label: '[] (no enumerable keys)', input: [], expected: true },
      { label: 'new Set() (no enumerable keys)', input: new Set(), expected: true },
      { label: 'new Map() (no enumerable keys)', input: new Map(), expected: true },
      { label: 'new Date() (no enumerable keys)', input: new Date(), expected: true },
      { label: '{ a: 1 }', input: { a: 1 }, expected: false },
      { label: '{ key: "value" }', input: { key: 'value' }, expected: false },
      { label: 'null', input: null, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'true', input: true, expected: false },
      { label: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT_AND_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT_AND_EMPTY(input)).toBe(expected)
      }
    )
  }
)
