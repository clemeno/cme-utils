import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_NOT_EMPTY } from '../../ts/check/is-an-object-and-not-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_NOT_EMPTY',
  () => {
    it(
      'should return true for non-empty plain objects',
      () => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY({ a: 1 })).toBe(true)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY({ key: 'value' })).toBe(true)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY({ x: 1, y: 2 })).toBe(true)
      }
    )

    it(
      'should return false for empty objects',
      () => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY({})).toBe(false)
      }
    )

    it(
      'should return false for arrays, sets, maps (they have no enumerable keys)',
      () => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY([])).toBe(false) // Empty array has no keys
        expect(IS_AN_OBJECT_AND_NOT_EMPTY([1, 2, 3])).toBe(true) // Non-empty array has keys (indices)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(new Set())).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(new Set([1]))).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(new Map())).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(new Map([['key', 'value']]))).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(new Date())).toBe(false)
      }
    )

    it(
      'should return false for null and primitives',
      () => {
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(null)).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY('hello')).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(123)).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(true)).toBe(false)
        expect(IS_AN_OBJECT_AND_NOT_EMPTY(undefined)).toBe(false)
      }
    )
  }
)
