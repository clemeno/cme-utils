import { describe, expect, it } from 'bun:test'
import { SET_CHAR_AT } from '../../ts/convert/set-char-at.util.js'

describe(
  'SET_CHAR_AT',
  () => {
    it(
      'should replace a single character',
      () => {
        expect(SET_CHAR_AT({ input: 'hello', at: 1, set: 'a' })).toBe('hallo')
        expect(SET_CHAR_AT({ input: 'world', at: 0, set: 'H' })).toBe('Horld')
        expect(SET_CHAR_AT({ input: 'test', at: 3, set: 'x' })).toBe('tesx')
      }
    )

    it(
      'should replace multiple characters',
      () => {
        expect(SET_CHAR_AT({ input: 'hello', at: 1, set: 'abc' })).toBe('habco')
        expect(SET_CHAR_AT({ input: 'world', at: 0, set: 'Hi' })).toBe('Hirld')
      }
    )

    it(
      'should handle edge positions',
      () => {
        expect(SET_CHAR_AT({ input: 'hello', at: 0, set: 'X' })).toBe('Xello')
        expect(SET_CHAR_AT({ input: 'hello', at: 4, set: 'X' })).toBe('hellX')
      }
    )

    it(
      'should handle positions beyond string length',
      () => {
        expect(SET_CHAR_AT({ input: 'hello', at: 10, set: 'X' })).toBe('helloX')
        expect(SET_CHAR_AT({ input: 'hi', at: 5, set: 'world' })).toBe('hiworld')
      }
    )

    it(
      'should handle empty replacement string',
      () => {
        expect(SET_CHAR_AT({ input: 'hello', at: 1, set: '' })).toBe('hello')
        expect(SET_CHAR_AT({ input: 'abc', at: 0, set: '' })).toBe('abc')
      }
    )
  }
)
