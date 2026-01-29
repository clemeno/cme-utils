import { describe, expect, it } from 'bun:test'
import { MIN_STEP } from '../../ts/constant/min-step.util.js'

describe(
  'MIN_STEP',
  () => {
    it(
      'should be the smallest positive number such that 1 + eps ≠ 1',
      () => {
        expect(MIN_STEP).toBe(Number.EPSILON)
        expect(MIN_STEP).toBe(2 ** -52)
        expect(1 + MIN_STEP).not.toBe(1)
        expect(1 + MIN_STEP / 2).toBe(1)
      }
    )

    it(
      'should be a positive number',
      () => {
        expect(MIN_STEP).toBeGreaterThan(0)
        expect(typeof MIN_STEP).toBe('number')
      }
    )
  }
)
