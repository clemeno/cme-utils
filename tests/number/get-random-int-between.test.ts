import { describe, expect, it } from 'bun:test'
import { GET_RANDOM_INT_BETWEEN } from '../../ts/number/get-random-int-between.util.js'

describe(
  'GET_RANDOM_INT_BETWEEN',
  () => {
    it(
      'should return an integer between min and max (inclusive)',
      () => {
        // Test with multiple calls to ensure randomness
        for (let i = 0; i < 100; i += 1) {
          const result = GET_RANDOM_INT_BETWEEN({ a: 5, b: 10 })
          expect(result).toBeGreaterThanOrEqual(5)
          expect(result).toBeLessThanOrEqual(10)
          expect(Number.isInteger(result)).toBe(true)
        }
      }
    )

    it(
      'should work when a > b',
      () => {
        for (let i = 0; i < 50; i += 1) {
          const result = GET_RANDOM_INT_BETWEEN({ a: 10, b: 5 })
          expect(result).toBeGreaterThanOrEqual(5)
          expect(result).toBeLessThanOrEqual(10)
          expect(Number.isInteger(result)).toBe(true)
        }
      }
    )

    it(
      'should handle decimal inputs by truncating them',
      () => {
        for (let i = 0; i < 50; i += 1) {
          const result = GET_RANDOM_INT_BETWEEN({ a: 5.7, b: 10.9 })
          expect(result).toBeGreaterThanOrEqual(5)
          expect(result).toBeLessThanOrEqual(10)
          expect(Number.isInteger(result)).toBe(true)
        }
      }
    )

    it(
      'should handle negative numbers',
      () => {
        for (let i = 0; i < 50; i += 1) {
          const result = GET_RANDOM_INT_BETWEEN({ a: -10, b: -5 })
          expect(result).toBeGreaterThanOrEqual(-10)
          expect(result).toBeLessThanOrEqual(-5)
          expect(Number.isInteger(result)).toBe(true)
        }
      }
    )

    it(
      'should handle same values',
      () => {
        const result = GET_RANDOM_INT_BETWEEN({ a: 5, b: 5 })
        expect(result).toBe(5)
      }
    )

    it(
      'should handle zero range',
      () => {
        const result = GET_RANDOM_INT_BETWEEN({ a: 0, b: 0 })
        expect(result).toBe(0)
      }
    )

    it(
      'should return a number',
      () => {
        const result = GET_RANDOM_INT_BETWEEN({ a: 1, b: 10 })
        expect(typeof result).toBe('number')
      }
    )
  }
)
