import { describe, expect, it } from 'bun:test'
import { IS_A_BIGINT } from '../../ts/check/is-a-bigint.util.js'

describe(
  'IS_A_BIGINT',
  () => {
    const trueCases = [
      { name: 'zero bigint literal (0n)', input: 0n, expected: true },
      { name: 'positive bigint literal (1n)', input: 1n, expected: true },
      { name: 'negative bigint literal (-1n)', input: -1n, expected: true },
      { name: 'large bigint literal', input: 9007199254740993n, expected: true },
    ]

    it.each(trueCases)(
      '$name',
      ({ input, expected }) => {
        expect(IS_A_BIGINT(input)).toBe(expected)
      }
    )

    const falseCases = [
      { name: 'integer number (0)', input: 0, expected: false },
      { name: 'integer number (1)', input: 1, expected: false },
      { name: 'negative integer number (-1)', input: -1, expected: false },
      { name: 'float number (1.5)', input: 1.5, expected: false },
      { name: 'numeric string ("42")', input: '42', expected: false },
      { name: 'empty string', input: '', expected: false },
      { name: 'boolean true', input: true, expected: false },
      { name: 'boolean false', input: false, expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'plain object', input: {}, expected: false },
      { name: 'array', input: [], expected: false },
      { name: 'NaN', input: NaN, expected: false },
      { name: 'Infinity', input: Infinity, expected: false },
    ]

    it.each(falseCases)(
      '$name',
      ({ input, expected }) => {
        expect(IS_A_BIGINT(input)).toBe(expected)
      }
    )
  }
)
