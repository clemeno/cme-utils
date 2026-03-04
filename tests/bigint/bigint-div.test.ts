import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV } from '../../ts/bigint/bigint-div.util.js'

describe(
  'BIGINT_DIV',
  () => {
    const testCases = [
      { name: 'exact division', input: { dividend: 10n, divisor: 2n }, expected: { q: 5n, r: 0n } },
      { name: 'positive dividend with remainder', input: { dividend: 10n, divisor: 3n }, expected: { q: 3n, r: 1n } },
      { name: 'negative dividend', input: { dividend: -10n, divisor: 3n }, expected: { q: -3n, r: -1n } },
      { name: 'negative divisor', input: { dividend: 10n, divisor: -3n }, expected: { q: -3n, r: 1n } },
      { name: 'both negative', input: { dividend: -10n, divisor: -3n }, expected: { q: 3n, r: -1n } },
      { name: 'zero dividend', input: { dividend: 0n, divisor: 5n }, expected: { q: 0n, r: 0n } },
      { name: 'dividend smaller than divisor', input: { dividend: 2n, divisor: 7n }, expected: { q: 0n, r: 2n } },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        const { q, r } = BIGINT_DIV(input)

        expect(q).toBe(expected.q)
        expect(r).toBe(expected.r)
      }
    )
  }
)
