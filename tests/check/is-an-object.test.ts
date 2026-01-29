import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT } from '../../ts/check/is-an-object.util.js'

describe(
  'IS_AN_OBJECT',
  () => {
    it(
      'should return true for objects',
      () => {
        expect(IS_AN_OBJECT({})).toBe(true)
        expect(IS_AN_OBJECT({ a: 1 })).toBe(true)
        expect(IS_AN_OBJECT([])).toBe(true)
        expect(IS_AN_OBJECT(new Date())).toBe(true)
        expect(IS_AN_OBJECT(new Set())).toBe(true)
        expect(IS_AN_OBJECT(new Map())).toBe(true)
      }
    )

    it(
      'should return false for null',
      () => {
        expect(IS_AN_OBJECT(null)).toBe(false)
      }
    )

    it(
      'should return false for primitives',
      () => {
        expect(IS_AN_OBJECT('hello')).toBe(false)
        expect(IS_AN_OBJECT(123)).toBe(false)
        expect(IS_AN_OBJECT(true)).toBe(false)
        expect(IS_AN_OBJECT(undefined)).toBe(false)
        expect(IS_AN_OBJECT(NaN)).toBe(false)
      }
    )
  }
)
