import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_CEIL } from '../../ts/bigint/bigint-div-ceil.util.js'

describe(
  'BIGINT_DIV_CEIL',
  () => {
    const testCases: Array<{ name: string, input: { dividend: bigint, divisor: bigint }, expected: bigint }> = [
      { name: 'exact division returns quotient unchanged', input: { dividend: 10n, divisor: 2n }, expected: 5n },
      { name: 'positive quotient with remainder rounds up', input: { dividend: 10n, divisor: 3n }, expected: 4n },
      { name: 'large positive with remainder rounds up', input: { dividend: 100n, divisor: 7n }, expected: 15n },
      { name: 'negative quotient with remainder stays unchanged', input: { dividend: -10n, divisor: 3n }, expected: -3n },
      { name: 'negative divisor with positive quotient rounds up', input: { dividend: -10n, divisor: -3n }, expected: 4n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 5n }, expected: 0n },
      { name: 'positive fraction below 1 rounds up to 1', input: { dividend: 1n, divisor: 3n }, expected: 1n },
      { name: 'both negative, fraction below 1 rounds up to 1', input: { dividend: -1n, divisor: -3n }, expected: 1n },
      { name: 'negative fraction above -1 rounds up to zero', input: { dividend: -1n, divisor: 3n }, expected: 0n },
      { name: 'negative divisor, negative quotient with remainder stays unchanged', input: { dividend: 10n, divisor: -3n }, expected: -3n },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_CEIL(input)).toBe(expected)
      }
    )
  }
)
