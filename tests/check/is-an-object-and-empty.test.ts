import { describe, expect, it } from 'bun:test'
import { IS_AN_OBJECT_AND_EMPTY } from '../../ts/check/is-an-object-and-empty.util.js'

describe(
  'IS_AN_OBJECT_AND_EMPTY',
  () => {
    it(
      'should return true for empty plain objects',
      () => {
        expect(IS_AN_OBJECT_AND_EMPTY({})).toBe(true)
      }
    )

    it(
      'should return false for non-empty objects',
      () => {
        expect(IS_AN_OBJECT_AND_EMPTY({ a: 1 })).toBe(false)
        expect(IS_AN_OBJECT_AND_EMPTY({ key: 'value' })).toBe(false)
      }
    )

    it(
      'should return false for arrays, sets, maps (they have keys)',
      () => {
        expect(IS_AN_OBJECT_AND_EMPTY([])).toBe(true) // Arrays have no enumerable keys
        expect(IS_AN_OBJECT_AND_EMPTY(new Set())).toBe(true) // Sets have no enumerable keys
        expect(IS_AN_OBJECT_AND_EMPTY(new Map())).toBe(true) // Maps have no enumerable keys
        expect(IS_AN_OBJECT_AND_EMPTY(new Date())).toBe(true) // Dates have no enumerable keys
      }
    )

    it(
      'should return false for null and primitives',
      () => {
        expect(IS_AN_OBJECT_AND_EMPTY(null)).toBe(false)
        expect(IS_AN_OBJECT_AND_EMPTY('hello')).toBe(false)
        expect(IS_AN_OBJECT_AND_EMPTY(123)).toBe(false)
        expect(IS_AN_OBJECT_AND_EMPTY(true)).toBe(false)
        expect(IS_AN_OBJECT_AND_EMPTY(undefined)).toBe(false)
      }
    )
  }
)
