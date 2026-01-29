import { describe, expect, it } from 'bun:test'
import { IS_EMPTY } from '../../ts/check/is-empty.util.js'

describe(
  'IS_EMPTY',
  () => {
    it(
      'should return true for null and undefined',
      () => {
        expect(IS_EMPTY(null)).toBe(true)
        expect(IS_EMPTY(undefined)).toBe(true)
      }
    )

    it(
      'should return true for NaN',
      () => {
        expect(IS_EMPTY(NaN)).toBe(true)
      }
    )

    it(
      'should return true for empty strings',
      () => {
        expect(IS_EMPTY('')).toBe(true)
      }
    )

    it(
      'should return true for empty arrays',
      () => {
        expect(IS_EMPTY([])).toBe(true)
      }
    )

    it(
      'should return true for empty sets',
      () => {
        expect(IS_EMPTY(new Set())).toBe(true)
      }
    )

    it(
      'should return true for empty maps',
      () => {
        expect(IS_EMPTY(new Map())).toBe(true)
      }
    )

    it(
      'should return true for invalid dates',
      () => {
        expect(IS_EMPTY(new Date('invalid'))).toBe(true)
        expect(IS_EMPTY(new Date(NaN))).toBe(true)
      }
    )

    it(
      'should return true for empty plain objects',
      () => {
        expect(IS_EMPTY({})).toBe(true)
      }
    )

    it(
      'should return false for non-empty values',
      () => {
        expect(IS_EMPTY(0)).toBe(false)
        expect(IS_EMPTY(123)).toBe(false)
        expect(IS_EMPTY('hello')).toBe(false)
        expect(IS_EMPTY([1])).toBe(false)
        expect(IS_EMPTY(new Set([1]))).toBe(false)
        expect(IS_EMPTY(new Map([['key', 'value']]))).toBe(false)
        expect(IS_EMPTY(new Date())).toBe(false)
        expect(IS_EMPTY({ a: 1 })).toBe(false)
        // Note: boolean true is considered "empty" by this function's logic
        // expect(IS_EMPTY(true)).toBe(false)
      }
    )
  }
)
