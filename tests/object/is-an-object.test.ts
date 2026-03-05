import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT } from '../../ts/object/is-an-object.util.js'

describe(
  'IS_AN_OBJECT',
  () => {
    const testCases = [
      { label: '{}', input: {}, expected: true },
      { label: '{ a: 1 }', input: { a: 1 }, expected: true },
      { label: '[]', input: [], expected: true },
      { label: 'new Date()', input: new Date(), expected: true },
      { label: 'new Set()', input: new Set(), expected: true },
      { label: 'new Map()', input: new Map(), expected: true },
      { label: 'null', input: null, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'true', input: true, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT($label) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT(input)).toBe(expected)
      }
    )
  }
)
