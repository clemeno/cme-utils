import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_ROUND } from '../../ts/bigint/bigint-div-round.util.js'

describe(
  'BIGINT_DIV_ROUND',
  () => {
    const testCases = [
      { name: 'exact division returns quotient unchanged', input: { dividend: 20n, divisor: 10n }, expected: 2n },
      { name: 'remainder below half rounds down', input: { dividend: 24n, divisor: 10n }, expected: 2n },
      { name: 'remainder equal to half rounds up', input: { dividend: 25n, divisor: 10n }, expected: 3n },
      { name: 'remainder above half rounds up', input: { dividend: 26n, divisor: 10n }, expected: 3n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 10n }, expected: 0n },
      { name: 'dividend just below midpoint rounds down', input: { dividend: 14n, divisor: 10n }, expected: 1n },
      { name: 'dividend at three-quarters rounds up', input: { dividend: 17n, divisor: 10n }, expected: 2n },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_ROUND(input)).toBe(expected)
      }
    )
  }
)
