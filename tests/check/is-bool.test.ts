import { describe, expect, it } from 'bun:test'
import { IS_BOOL } from '../../ts/check/is-bool.util.js'

describe(
  'IS_BOOL',
  () => {
    it(
      'should return true for boolean values',
      () => {
        expect(IS_BOOL(true)).toBe(true)
        expect(IS_BOOL(false)).toBe(true)
      }
    )

    it(
      'should return true for numeric 0 and 1',
      () => {
        expect(IS_BOOL(0)).toBe(true)
        expect(IS_BOOL(1)).toBe(true)
      }
    )

    it(
      'should return true for string representations of booleans',
      () => {
        expect(IS_BOOL('1')).toBe(true)
        expect(IS_BOOL('0')).toBe(true)
        expect(IS_BOOL('true')).toBe(true)
        expect(IS_BOOL('false')).toBe(true)
        expect(IS_BOOL('yes')).toBe(true)
        expect(IS_BOOL('no')).toBe(true)
        expect(IS_BOOL('on')).toBe(true)
        expect(IS_BOOL('off')).toBe(true)
        expect(IS_BOOL('y')).toBe(true)
        expect(IS_BOOL('n')).toBe(true)
        expect(IS_BOOL('ok')).toBe(true)
        expect(IS_BOOL('ko')).toBe(true)
        // Case insensitive
        expect(IS_BOOL('TRUE')).toBe(true)
        expect(IS_BOOL('FALSE')).toBe(true)
        expect(IS_BOOL('YES')).toBe(true)
        expect(IS_BOOL('NO')).toBe(true)
      }
    )

    it(
      'should return false for other numbers',
      () => {
        expect(IS_BOOL(2)).toBe(false)
        expect(IS_BOOL(-1)).toBe(false)
        expect(IS_BOOL(1.5)).toBe(false)
      }
    )

    it(
      'should return false for other strings',
      () => {
        expect(IS_BOOL('hello')).toBe(false)
        expect(IS_BOOL('')).toBe(false)
        expect(IS_BOOL('2')).toBe(false)
        expect(IS_BOOL('maybe')).toBe(false)
      }
    )

    it(
      'should return false for null, undefined, objects',
      () => {
        expect(IS_BOOL(null)).toBe(false)
        expect(IS_BOOL(undefined)).toBe(false)
        expect(IS_BOOL({})).toBe(false)
        expect(IS_BOOL([])).toBe(false)
        expect(IS_BOOL(NaN)).toBe(false)
      }
    )
  }
)
