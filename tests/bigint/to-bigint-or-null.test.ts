import { describe, expect, it } from 'bun:test'
import { TO_BIGINT_OR_NULL } from '../../ts/bigint/to-bigint-or-null.util.js'

describe(
  'TO_BIGINT_OR_NULL',
  () => {
    const bigintCases: Array<{ name: string, input: bigint | number | string, expected: bigint }> = [
      { name: 'bigint passthrough (0n)', input: 0n, expected: 0n },
      { name: 'bigint passthrough (42n)', input: 42n, expected: 42n },
      { name: 'bigint passthrough (-7n)', input: -7n, expected: -7n },
      { name: 'integer number 0', input: 0, expected: 0n },
      { name: 'integer number 42', input: 42, expected: 42n },
      { name: 'negative integer number -7', input: -7, expected: -7n },
      { name: 'numeric string "0"', input: '0', expected: 0n },
      { name: 'numeric string "42"', input: '42', expected: 42n },
      { name: 'negative numeric string "-7"', input: '-7', expected: -7n },
      { name: 'hex string "0xff" (BigInt syntax)', input: '0xff', expected: 255n },
      { name: 'hex string beyond 2^53 "0x20000000000000"', input: '0x20000000000000', expected: 9007199254740992n },
    ]

    it.each(bigintCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_BIGINT_OR_NULL(input)).toBe(expected)
      }
    )

    const nullCases: Array<{ name: string, input: unknown }> = [
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
      { name: 'blank string', input: '  ' },
    ]

    it.each(nullCases)(
      '$name',
      ({ input }) => {
        expect(TO_BIGINT_OR_NULL(input)).toBeNull()
      }
    )
  }
)
