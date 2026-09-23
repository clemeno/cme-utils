import { describe, expect, it } from 'bun:test'
import { MIN_STEP } from '../../ts/constant/min-step.util.js'

describe(
  'MIN_STEP',
  () => {
    it.each<{ name: string, input: unknown, expected: unknown }>([
      { name: 'is Number.EPSILON', input: MIN_STEP, expected: Number.EPSILON },
      { name: 'is 2 ** -52', input: MIN_STEP, expected: 2 ** -52 },
      { name: '1 + MIN_STEP ≠ 1: it is the next double after 1', input: 1 + MIN_STEP, expected: 1.0000000000000002 },
      { name: '1 + MIN_STEP / 2 rounds back to 1', input: 1 + MIN_STEP / 2, expected: 1 },
      { name: 'is positive', input: MIN_STEP > 0, expected: true },
      { name: 'is a number', input: typeof MIN_STEP, expected: 'number' },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(input).toBe(expected)
      }
    )
  }
)
