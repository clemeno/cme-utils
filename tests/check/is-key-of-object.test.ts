import { describe, expect, it } from 'bun:test'
import { IS_KEY_OF_OBJECT } from '../../ts/check/is-key-of-object.util.js'

describe(
  'IS_KEY_OF_OBJECT',
  () => {
    it(
      'should return true when key exists in object',
      () => {
        expect(IS_KEY_OF_OBJECT({ key: 'a', of: { a: 1, b: 2 } })).toBe(true)
        expect(IS_KEY_OF_OBJECT({ key: 0, of: { 0: 'zero', 1: 'one' } })).toBe(true)
        // Note: 'length' is not enumerable in Object.keys() for arrays
        // expect(IS_KEY_OF_OBJECT({ key: 'length', of: [] })).toBe(true)
      }
    )

    it(
      'should return false when key does not exist in object',
      () => {
        expect(IS_KEY_OF_OBJECT({ key: 'c', of: { a: 1, b: 2 } })).toBe(false)
        expect(IS_KEY_OF_OBJECT({ key: 2, of: { 0: 'zero', 1: 'one' } })).toBe(false)
      }
    )

    it(
      'should return false when of is null or undefined',
      () => {
        expect(IS_KEY_OF_OBJECT({ key: 'a', of: null })).toBe(false)
        expect(IS_KEY_OF_OBJECT({ key: 'a', of: undefined })).toBe(false)
      }
    )

    it(
      'should handle numeric keys converted to strings',
      () => {
        expect(IS_KEY_OF_OBJECT({ key: 1, of: { 1: 'one' } })).toBe(true)
        expect(IS_KEY_OF_OBJECT({ key: '1', of: { 1: 'one' } })).toBe(true)
      }
    )
  }
)
