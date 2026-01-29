import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_AND_SAFE } from '../../ts/check/is-numeric-and-safe.util.js'

describe(
  'IS_NUMERIC_AND_SAFE',
  () => {
    it(
      'should return true for safe numeric values',
      () => {
        expect(IS_NUMERIC_AND_SAFE(0)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(1)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(100)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(123.45)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(Number.EPSILON)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('0')).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('123')).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('123.45')).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(-1)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(-100)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('-123')).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(-1.5)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE(-123.45)).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('-1.5')).toBe(true)
        expect(IS_NUMERIC_AND_SAFE('-123.45')).toBe(true)
      }
    )

    it(
      'should return false for values below EPSILON',
      () => {
        expect(IS_NUMERIC_AND_SAFE(Number.EPSILON - 0.0000000000000001)).toBe(false)
        expect(IS_NUMERIC_AND_SAFE(-Number.EPSILON + 0.0000000000000001)).toBe(false)
      }
    )

    it(
      'should return false for values above MAX_SAFE_INTEGER',
      () => {
        expect(IS_NUMERIC_AND_SAFE(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
        expect(IS_NUMERIC_AND_SAFE(Number.MAX_VALUE)).toBe(false)
      }
    )

    it(
      'should return false for NaN and invalid strings',
      () => {
        expect(IS_NUMERIC_AND_SAFE(NaN)).toBe(false)
        expect(IS_NUMERIC_AND_SAFE('')).toBe(false)
        expect(IS_NUMERIC_AND_SAFE('abc')).toBe(false)
        expect(IS_NUMERIC_AND_SAFE(null)).toBe(false)
        expect(IS_NUMERIC_AND_SAFE(undefined)).toBe(false)
      }
    )
  }
)
