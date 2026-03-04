import { describe, expect, it } from 'bun:test'
import { IS_AN_INT } from '../../ts/check/is-an-int.util.js'

describe(
  'IS_AN_INT',
  () => {
    const trueCases = [
      { name: 'bigint literal (0n)', input: 0n, expected: true },
      { name: 'bigint literal (42n)', input: 42n, expected: true },
      { name: 'bigint literal (-7n)', input: -7n, expected: true },
      { name: 'integer number 0', input: 0, expected: true },
      { name: 'integer number 42', input: 42, expected: true },
      { name: 'negative integer number -7', input: -7, expected: true },
      { name: 'numeric string "0"', input: '0', expected: true },
      { name: 'numeric string "42"', input: '42', expected: true },
      { name: 'negative numeric string "-7"', input: '-7', expected: true },
    ]

    it.each(trueCases)(
      '$name',
      ({ input, expected }) => {
        expect(IS_AN_INT(input)).toBe(expected)
      }
    )

    const falseCases = [
      { name: 'float number 1.5', input: 1.5, expected: false },
      { name: 'float string "1.5"', input: '1.5', expected: false },
      { name: 'non-numeric string "abc"', input: 'abc', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'NaN', input: NaN, expected: false },
      { name: 'Infinity', input: Infinity, expected: false },
      { name: 'boolean true', input: true, expected: false },
      { name: 'boolean false', input: false, expected: false },
      { name: 'empty string', input: '', expected: false },
      { name: 'plain object', input: {}, expected: false },
      { name: 'array', input: [], expected: false },
      { name: 'function', input: () => {}, expected: false },
    ]

    it.each(falseCases)(
      '$name',
      ({ input, expected }) => {
        expect(IS_AN_INT(input)).toBe(expected)
      }
    )
  }
)
