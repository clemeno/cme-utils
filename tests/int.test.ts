import { describe, expect, it } from 'bun:test'
import type { int } from '../ts/int.js'

describe(
  'int',
  () => {
    it(
      'accepts a bigint zero',
      () => {
        const v: int = 0n
        expect(v).toBe(0n)
      }
    )

    it(
      'accepts a positive bigint',
      () => {
        const v: int = 42n
        expect(v).toBe(42n)
      }
    )

    it(
      'accepts a negative bigint',
      () => {
        const v: int = -7n
        expect(v).toBe(-7n)
      }
    )

    it(
      'accepts a very large bigint',
      () => {
        const v: int = 9007199254740993n
        expect(v).toBe(9007199254740993n)
      }
    )

    it(
      'accepts a number',
      () => {
        const v: int = 42
        expect(v).toBe(42)
      }
    )

    it(
      'accepts a float number',
      () => {
        const v: int = 3.14
        expect(v).toBe(3.14)
      }
    )

    it(
      'accepts a negative number',
      () => {
        const v: int = -7
        expect(v).toBe(-7)
      }
    )

    it(
      'accepts zero',
      () => {
        const v: int = 0
        expect(v).toBe(0)
      }
    )

    it(
      'accepts NaN',
      () => {
        const v: int = NaN
        expect(v).toBeNaN()
      }
    )

    it(
      'accepts a numeric string',
      () => {
        const v: int = '123'
        expect(v).toBe('123')
      }
    )

    it(
      'accepts a negative numeric string',
      () => {
        const v: int = '-7'
        expect(v).toBe('-7')
      }
    )

    it(
      'accepts an empty string',
      () => {
        const v: int = ''
        expect(v).toBe('')
      }
    )

    it(
      'accepts a string representation of NaN',
      () => {
        const v: int = 'NaN'
        expect(v).toBe('NaN')
      }
    )
  }
)
