import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_AND_UNSAFE } from '../../ts/check/is-numeric-and-unsafe.util.js'

describe(
  'IS_NUMERIC_AND_UNSAFE',
  () => {
    it(
      'should return true for unsafe numeric values',
      () => {
        expect(IS_NUMERIC_AND_UNSAFE(Number.EPSILON - 0.0000000000000001)).toBe(true)
        expect(IS_NUMERIC_AND_UNSAFE(-(Number.EPSILON - 0.0000000000000001))).toBe(true)
        expect(IS_NUMERIC_AND_UNSAFE(Number.MAX_SAFE_INTEGER + 1)).toBe(true)
        expect(IS_NUMERIC_AND_UNSAFE(Number.MAX_VALUE)).toBe(true)
        expect(IS_NUMERIC_AND_UNSAFE(-(Number.MAX_SAFE_INTEGER + 1))).toBe(true)
        expect(IS_NUMERIC_AND_UNSAFE(-Number.MAX_VALUE)).toBe(true)
      }
    )

    it(
      'should return false for safe numeric values',
      () => {
        expect(IS_NUMERIC_AND_UNSAFE(0)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(1)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(100)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(Number.EPSILON)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(Number.MAX_SAFE_INTEGER)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('0')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('123')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(-1)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(-100)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('-123')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(-1.5)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(-123.45)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('-1.5')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('-123.45')).toBe(false)
      }
    )

    it(
      'should return false for NaN and invalid values',
      () => {
        expect(IS_NUMERIC_AND_UNSAFE(NaN)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE('abc')).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(null)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE(undefined)).toBe(false)
        expect(IS_NUMERIC_AND_UNSAFE({})).toBe(false)
      }
    )
  }
)
