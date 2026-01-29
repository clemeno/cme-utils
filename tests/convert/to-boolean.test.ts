import { describe, expect, it } from 'bun:test'
import { TO_BOOLEAN } from '../../ts/convert/to-boolean.util.js'

describe(
  'TO_BOOLEAN',
  () => {
    const booleanTestCases = [
      { name: 'true', input: true, expected: true },
      { name: 'false', input: false, expected: false },
    ]

    it.each(booleanTestCases)(
      'should return boolean $name as-is',
      ({ input, expected }) => {
        expect(TO_BOOLEAN(input)).toBe(expected)
      }
    )

    const truthyTestCases = [
      { name: 'positive number', input: 1, expected: true },
      { name: 'negative number', input: -1, expected: true },
      { name: 'non-zero number', input: 123, expected: true },
      { name: 'non-empty string', input: 'hello', expected: true },
      { name: 'string zero', input: '0', expected: true },
      { name: 'string false', input: 'false', expected: true },
      { name: 'object', input: { a: 1 }, expected: true },
      { name: 'array', input: [1, 2, 3], expected: true },
    ]

    it.each(truthyTestCases)(
      'should convert $name to true',
      ({ input, expected }) => {
        expect(TO_BOOLEAN(input)).toBe(expected)
      }
    )

    const falsyTestCases = [
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'NaN', input: NaN, expected: false },
      { name: 'empty string', input: '', expected: false },
    ]

    it.each(falsyTestCases)(
      'should convert $name to false',
      ({ input, expected }) => {
        expect(TO_BOOLEAN(input)).toBe(expected)
      }
    )
  }
)
