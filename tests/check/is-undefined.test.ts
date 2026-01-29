import { describe, expect, it } from 'bun:test'
import { IS_UNDEFINED } from '../../ts/check/is-undefined.util.js'

describe(
  'IS_UNDEFINED',
  () => {
    it(
      'should return true for undefined',
      () => {
        expect(IS_UNDEFINED(undefined)).toBe(true)
      }
    )

    it(
      'should return false for null',
      () => {
        expect(IS_UNDEFINED(null)).toBe(false)
      }
    )

    it(
      'should return false for other values',
      () => {
        expect(IS_UNDEFINED(0)).toBe(false)
        expect(IS_UNDEFINED('')).toBe(false)
        expect(IS_UNDEFINED(false)).toBe(false)
        expect(IS_UNDEFINED({})).toBe(false)
        expect(IS_UNDEFINED([])).toBe(false)
      }
    )
  }
)
