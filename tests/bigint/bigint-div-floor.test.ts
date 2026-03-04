import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_FLOOR } from '../../ts/bigint/bigint-div-floor.util.js'

describe(
  'BIGINT_DIV_FLOOR',
  () => {
    const testCases = [
      { name: 'exact division returns quotient unchanged', input: { dividend: 10n, divisor: 2n }, expected: 5n },
      { name: 'positive quotient with remainder stays unchanged', input: { dividend: 10n, divisor: 3n }, expected: 3n },
      { name: 'negative quotient with remainder rounds down', input: { dividend: -10n, divisor: 3n }, expected: -4n },
      { name: 'negative divisor positive dividend rounds down', input: { dividend: 10n, divisor: -3n }, expected: -4n },
      { name: 'both negative returns positive quotient unchanged', input: { dividend: -10n, divisor: -3n }, expected: 3n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 5n }, expected: 0n },
      { name: 'dividend smaller than divisor returns zero', input: { dividend: 2n, divisor: 7n }, expected: 0n },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_FLOOR(input)).toBe(expected)
      }
    )
  }
)
