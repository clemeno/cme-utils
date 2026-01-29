import { describe, expect, it } from 'bun:test'
import { TO_ARRAY } from '../../ts/convert/to-array.util.js'

describe(
  'TO_ARRAY',
  () => {
    it(
      'should return arrays as-is',
      () => {
        const arr = [1, 2, 3]
        expect(TO_ARRAY(arr)).toBe(arr)
        expect(TO_ARRAY([])).toEqual([])
        expect(TO_ARRAY(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
      }
    )

    it(
      'should convert array-like objects',
      () => {
        expect(TO_ARRAY('hello')).toEqual(['h', 'e', 'l', 'l', 'o'])
        expect(TO_ARRAY({ 0: 'a', 1: 'b', 2: 'c', length: 3 })).toEqual(['a', 'b', 'c'])
      }
    )

    it(
      'should convert iterables',
      () => {
        const set = new Set([1, 2, 3])
        expect(TO_ARRAY(set)).toEqual([1, 2, 3])

        const map = new Map([['a', 1], ['b', 2]])
        expect(TO_ARRAY(map)).toEqual([['a', 1], ['b', 2]])
      }
    )

    it(
      'should return empty array for non-convertible values',
      () => {
        expect(TO_ARRAY(null)).toEqual([])
        expect(TO_ARRAY(undefined)).toEqual([])
        expect(TO_ARRAY(42)).toEqual([])
        expect(TO_ARRAY({})).toEqual([])
        expect(TO_ARRAY(true)).toEqual([])
      }
    )

    it(
      'should handle edge cases',
      () => {
        // Objects with length but no indexed properties
        expect(TO_ARRAY({ length: 0 })).toEqual([])
        expect(TO_ARRAY({ length: 3 })).toEqual([undefined, undefined, undefined])
      }
    )
  }
)
