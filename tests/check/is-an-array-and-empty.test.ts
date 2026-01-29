import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY_AND_EMPTY } from '../../ts/check/is-an-array-and-empty.util.js'

describe(
  'IS_AN_ARRAY_AND_EMPTY',
  () => {
    it(
      'should return true for empty arrays',
      () => {
        expect(IS_AN_ARRAY_AND_EMPTY([])).toBe(true)
      }
    )

    it(
      'should return false for non-empty arrays',
      () => {
        expect(IS_AN_ARRAY_AND_EMPTY([1])).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY([1, 2, 3])).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(['a'])).toBe(false)
      }
    )

    it(
      'should return false for non-arrays',
      () => {
        expect(IS_AN_ARRAY_AND_EMPTY('hello')).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(123)).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(null)).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(undefined)).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(true)).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY({})).toBe(false)
        expect(IS_AN_ARRAY_AND_EMPTY(NaN)).toBe(false)
      }
    )
  }
)
