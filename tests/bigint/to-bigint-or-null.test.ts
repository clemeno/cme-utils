import { describe, expect, it } from 'bun:test'
import { TO_BIGINT_OR_NULL } from '../../ts/bigint/to-bigint-or-null.util.js'

describe(
  'TO_BIGINT_OR_NULL',
  () => {
    const bigintCases = [
      { name: 'bigint passthrough (0n)', input: 0n, expected: 0n },
      { name: 'bigint passthrough (42n)', input: 42n, expected: 42n },
      { name: 'bigint passthrough (-7n)', input: -7n, expected: -7n },
      { name: 'integer number 0', input: 0, expected: 0n },
      { name: 'integer number 42', input: 42, expected: 42n },
      { name: 'negative integer number -7', input: -7, expected: -7n },
      { name: 'numeric string "0"', input: '0', expected: 0n },
      { name: 'numeric string "42"', input: '42', expected: 42n },
      { name: 'negative numeric string "-7"', input: '-7', expected: -7n },
    ]

    it.each(bigintCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_BIGINT_OR_NULL(input)).toBe(expected)
      }
    )

    const nullCases = [
      { name: 'float number 1.5', input: 1.5 },
      { name: 'float string "1.5"', input: '1.5' },
      { name: 'non-numeric string "abc"', input: 'abc' },
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'NaN', input: NaN },
      { name: 'Infinity', input: Infinity },
      { name: 'plain object', input: {} },
      { name: 'array', input: [] },
      { name: 'function', input: () => {} },
      { name: 'array with items', input: [1, 2] },
      { name: 'boolean true', input: true },
      { name: 'boolean false', input: false },
      { name: 'empty string', input: '' },
    ]

    it.each(nullCases)(
      '$name',
      ({ input }) => {
        expect(TO_BIGINT_OR_NULL(input)).toBeNull()
      }
    )
  }
)
