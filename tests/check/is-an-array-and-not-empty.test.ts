import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY_AND_NOT_EMPTY } from '../../ts/check/is-an-array-and-not-empty.util.js'

describe(
  'IS_AN_ARRAY_AND_NOT_EMPTY',
  () => {
    it(
      'should return true for non-empty arrays',
      () => {
        expect(IS_AN_ARRAY_AND_NOT_EMPTY([1])).toBe(true)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY([1, 2, 3])).toBe(true)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(['a'])).toBe(true)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY([{}])).toBe(true)
      }
    )

    it(
      'should return false for empty arrays',
      () => {
        expect(IS_AN_ARRAY_AND_NOT_EMPTY([])).toBe(false)
      }
    )

    it(
      'should return false for non-arrays',
      () => {
        expect(IS_AN_ARRAY_AND_NOT_EMPTY('hello')).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(123)).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(null)).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(undefined)).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(true)).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY({})).toBe(false)
        expect(IS_AN_ARRAY_AND_NOT_EMPTY(NaN)).toBe(false)
      }
    )
  }
)
