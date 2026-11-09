import { describe, expect, it } from 'bun:test'
import { BIGINT_DIV_ROUND } from '../../ts/bigint/bigint-div-round.util.js'

describe(
  'BIGINT_DIV_ROUND',
  () => {
    const testCases: Array<{ name: string, input: { dividend: bigint, divisor: bigint }, expected: bigint }> = [
      { name: 'exact division returns quotient unchanged', input: { dividend: 20n, divisor: 10n }, expected: 2n },
      { name: 'remainder below half rounds down', input: { dividend: 24n, divisor: 10n }, expected: 2n },
      { name: 'remainder equal to half rounds up', input: { dividend: 25n, divisor: 10n }, expected: 3n },
      { name: 'remainder above half rounds up', input: { dividend: 26n, divisor: 10n }, expected: 3n },
      { name: 'zero dividend returns zero', input: { dividend: 0n, divisor: 10n }, expected: 0n },
      { name: 'dividend just below midpoint rounds down', input: { dividend: 14n, divisor: 10n }, expected: 1n },
      { name: 'dividend at three-quarters rounds up', input: { dividend: 17n, divisor: 10n }, expected: 2n },
      { name: 'odd divisor, a third rounds down', input: { dividend: 1n, divisor: 3n }, expected: 0n },
      { name: 'odd divisor, one and a third rounds down', input: { dividend: 4n, divisor: 3n }, expected: 1n },
      { name: 'odd divisor, two thirds rounds up', input: { dividend: 2n, divisor: 3n }, expected: 1n },
      { name: 'negative dividend, -2.6 rounds to -3', input: { dividend: -26n, divisor: 10n }, expected: -3n },
      { name: 'negative dividend, -2.5 rounds toward +infinity to -2', input: { dividend: -25n, divisor: 10n }, expected: -2n },
      { name: 'negative dividend, -2.4 rounds to -2', input: { dividend: -24n, divisor: 10n }, expected: -2n },
      { name: 'negative divisor rounds to the nearest', input: { dividend: 5n, divisor: -3n }, expected: -2n },
      { name: 'negative divisor at half rounds toward +infinity', input: { dividend: 3n, divisor: -2n }, expected: -1n },
      { name: 'both negative rounds to the nearest', input: { dividend: -5n, divisor: -3n }, expected: 2n },
    ]

    it(
      'division by zero throws a RangeError',
      () => {
        expect(() => BIGINT_DIV_ROUND({ dividend: 7n, divisor: 0n })).toThrow(RangeError)
      }
    )

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIGINT_DIV_ROUND(input)).toBe(expected)
      }
    )
  }
)
