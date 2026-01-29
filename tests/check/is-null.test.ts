import { describe, expect, it } from 'bun:test'
import { IS_NULL } from '../../ts/check/is-null.util.js'

describe(
  'IS_NULL',
  () => {
    it(
      'should return true for null',
      () => {
        expect(IS_NULL(null)).toBe(true)
      }
    )

    it(
      'should return false for undefined',
      () => {
        expect(IS_NULL(undefined)).toBe(false)
      }
    )

    it(
      'should return false for other values',
      () => {
        expect(IS_NULL(0)).toBe(false)
        expect(IS_NULL('')).toBe(false)
        expect(IS_NULL(false)).toBe(false)
        expect(IS_NULL({})).toBe(false)
        expect(IS_NULL([])).toBe(false)
      }
    )
  }
)
