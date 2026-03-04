import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_CEIL } from '../../ts/bigint/bigint-div-ceil.util.js'

describe(
  'BIGINT_DIV_CEIL',
  () => {
    const testCases = [
      { name: 'exact division returns quotient unchanged', input: { dividend: 10n, divisor: 2n }, expected: 5n },
      { name: 'positive quotient with remainder rounds up', input: { dividend: 10n, divisor: 3n }, expected: 4n },
      { name: 'large positive with remainder rounds up', input: { dividend: 100n, divisor: 7n }, expected: 15n },
      { name: 'negative quotient with remainder stays unchanged', input: { dividend: -10n, divisor: 3n }, expected: -3n },
      { name: 'negative divisor with positive quotient rounds up', input: { dividend: -10n, divisor: -3n }, expected: 4n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 5n }, expected: 0n },
      { name: 'dividend smaller than divisor returns zero when quotient is zero', input: { dividend: 1n, divisor: 3n }, expected: 0n },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_CEIL(input)).toBe(expected)
      }
    )
  }
)
