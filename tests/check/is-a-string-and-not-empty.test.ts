import { describe, expect, it } from 'bun:test'
import { IS_A_STRING_AND_NOT_EMPTY } from '../../ts/check/is-a-string-and-not-empty.util.js'

describe(
  'IS_A_STRING_AND_NOT_EMPTY',
  () => {
    it(
      'should return true for non-empty strings',
      () => {
        expect(IS_A_STRING_AND_NOT_EMPTY('hello')).toBe(true)
        expect(IS_A_STRING_AND_NOT_EMPTY(' ')).toBe(true)
        expect(IS_A_STRING_AND_NOT_EMPTY('123')).toBe(true)
        expect(IS_A_STRING_AND_NOT_EMPTY('a')).toBe(true)
      }
    )

    it(
      'should return false for empty string',
      () => {
        expect(IS_A_STRING_AND_NOT_EMPTY('')).toBe(false)
      }
    )

    it(
      'should return false for non-strings',
      () => {
        expect(IS_A_STRING_AND_NOT_EMPTY(123)).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY(null)).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY(undefined)).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY(true)).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY({})).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY([])).toBe(false)
        expect(IS_A_STRING_AND_NOT_EMPTY(NaN)).toBe(false)
      }
    )
  }
)
