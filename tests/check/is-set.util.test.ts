import { describe, expect, it } from 'bun:test'
import { IS_SET } from '../../ts/check/is-set.util.js'

describe(
  'IS_SET',
  () => {
    it(
      'should return true for defined values',
      () => {
        expect(IS_SET(0)).toBe(true)
        expect(IS_SET(false)).toBe(true)
        expect(IS_SET('')).toBe(true)
        expect(IS_SET([])).toBe(true)
        expect(IS_SET({})).toBe(true)
        expect(IS_SET(NaN)).toBe(true)
      }
    )

    it(
      'should return false for null and undefined',
      () => {
        expect(IS_SET(null)).toBe(false)
        expect(IS_SET(undefined)).toBe(false)
      }
    )
  }
)
