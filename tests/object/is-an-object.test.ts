import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT } from '../../ts/object/is-an-object.util.js'

describe(
  'IS_AN_OBJECT',
  () => {
    const testCases = [
      { name: '{}', input: {}, expected: true },
      { name: '{ a: 1 }', input: { a: 1 }, expected: true },
      { name: '[]', input: [], expected: true },
      { name: 'new Date()', input: new Date(), expected: true },
      { name: 'new Set()', input: new Set(), expected: true },
      { name: 'new Map()', input: new Map(), expected: true },
      { name: 'null', input: null, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'true', input: true, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_AN_OBJECT($name) → $expected',
      ({ input, expected }) => {
        expect(IS_AN_OBJECT(input)).toBe(expected)
      }
    )
  }
)
