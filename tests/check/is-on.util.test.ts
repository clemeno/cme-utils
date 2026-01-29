import { describe, expect, it } from 'bun:test'
import { IS_ON } from '../../ts/check/is-on.util.js'

describe(
  'IS_ON',
  () => {
    it(
      'should return true for truthy values',
      () => {
        expect(IS_ON(true)).toBe(true)
        expect(IS_ON(1)).toBe(true)
        expect(IS_ON(-1)).toBe(true)
        expect(IS_ON('hello')).toBe(true)
        expect(IS_ON('0')).toBe(true)
        expect(IS_ON('false')).toBe(true)
        expect(IS_ON([])).toBe(true)
        expect(IS_ON({})).toBe(true)
        expect(IS_ON(new Date())).toBe(true)
      }
    )

    it(
      'should return false for falsy values',
      () => {
        expect(IS_ON(false)).toBe(false)
        expect(IS_ON(0)).toBe(false)
        expect(IS_ON('')).toBe(false)
        expect(IS_ON(null)).toBe(false)
        expect(IS_ON(undefined)).toBe(false)
        expect(IS_ON(NaN)).toBe(false)
      }
    )
  }
)
