import { describe, expect, it } from 'bun:test'
import { IS_A_SET } from '../../ts/check/is-a-set.util.js'

describe(
  'IS_A_SET',
  () => {
    it(
      'should return true for Set instances',
      () => {
        expect(IS_A_SET(new Set())).toBe(true)
        expect(IS_A_SET(new Set([1, 2, 3]))).toBe(true)
        expect(IS_A_SET(new Set(['a', 'b']))).toBe(true)
      }
    )

    it(
      'should return false for non-Set values',
      () => {
        expect(IS_A_SET([])).toBe(false)
        expect(IS_A_SET({})).toBe(false)
        expect(IS_A_SET('hello')).toBe(false)
        expect(IS_A_SET(123)).toBe(false)
        expect(IS_A_SET(null)).toBe(false)
        expect(IS_A_SET(undefined)).toBe(false)
        expect(IS_A_SET(true)).toBe(false)
        expect(IS_A_SET(new Map())).toBe(false)
        expect(IS_A_SET(new Date())).toBe(false)
      }
    )
  }
)
