import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_TRUNC } from '../../ts/bigint/bigint-div-trunk.util.js'

describe(
  'BIGINT_DIV_TRUNC',
  () => {
    const testCases = [
      { name: 'exact division', input: { dividend: 10n, divisor: 2n }, expected: 5n },
      { name: 'positive truncation discards remainder', input: { dividend: 10n, divisor: 3n }, expected: 3n },
      { name: 'negative dividend truncates toward zero', input: { dividend: -10n, divisor: 3n }, expected: -3n },
      { name: 'negative divisor truncates toward zero', input: { dividend: 10n, divisor: -3n }, expected: -3n },
      { name: 'both negative returns positive quotient', input: { dividend: -10n, divisor: -3n }, expected: 3n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 5n }, expected: 0n },
      { name: 'dividend smaller than divisor returns zero', input: { dividend: 2n, divisor: 7n }, expected: 0n },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_TRUNC(input)).toBe(expected)
      }
    )
  }
)
