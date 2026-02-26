import { describe, expect, it } from 'bun:test'
import { TO_ANY_ARRAY } from '../../ts/convert/to-any-array.util.js'

describe(
  'TO_ANY_ARRAY',
  () => {
    it('returns an array as-is', () => {
      const arr = [1, 2, 3]
      expect(TO_ANY_ARRAY(arr)).toBe(arr)
    })

    it('converts Uint8Array to plain array', () => {
      expect(TO_ANY_ARRAY(new Uint8Array([10, 20, 30]))).toEqual([10, 20, 30])
    })

    it('converts Buffer to plain array', () => {
      expect(TO_ANY_ARRAY(Buffer.from([1, 2, 3]))).toEqual([1, 2, 3])
    })

    it('converts a string (iterable) to array of characters', () => {
      expect(TO_ANY_ARRAY('abc')).toEqual(['a', 'b', 'c'])
    })

    it('converts a Set to array', () => {
      expect(TO_ANY_ARRAY(new Set([1, 2, 3]))).toEqual([1, 2, 3])
    })

    it('converts an array-like object to array', () => {
      expect(TO_ANY_ARRAY({ length: 3, 0: 'x', 1: 'y', 2: 'z' })).toEqual(['x', 'y', 'z'])
    })

    it('returns empty array for null', () => {
      expect(TO_ANY_ARRAY(null)).toEqual([])
    })

    it('returns empty array for undefined', () => {
      expect(TO_ANY_ARRAY(undefined)).toEqual([])
    })

    it('returns empty array for a number', () => {
      expect(TO_ANY_ARRAY(42)).toEqual([])
    })

    it('returns empty array for a plain object without length', () => {
      expect(TO_ANY_ARRAY({ a: 1 })).toEqual([])
    })
  }
)
