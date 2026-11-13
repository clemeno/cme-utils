import { describe, expect, it } from 'bun:test'
import { SET_CHAR_AT } from '../../ts/convert/set-char-at.util.js'

describe(
  'SET_CHAR_AT',
  () => {
    const testCases: Array<{ name: string, input: string, at: number, set: string, expected: string }> = [
      { name: '"hello" at 1 set "a"', input: 'hello', at: 1, set: 'a', expected: 'hallo' },
      { name: '"world" at 0 set "H"', input: 'world', at: 0, set: 'H', expected: 'Horld' },
      { name: '"test" at 3 set "x"', input: 'test', at: 3, set: 'x', expected: 'tesx' },
      { name: '"hello" at 1 set "abc" (multi-char)', input: 'hello', at: 1, set: 'abc', expected: 'habco' },
      { name: '"world" at 0 set "Hi" (multi-char)', input: 'world', at: 0, set: 'Hi', expected: 'Hirld' },
      { name: '"hello" at 0 (start)', input: 'hello', at: 0, set: 'X', expected: 'Xello' },
      { name: '"hello" at 4 (end)', input: 'hello', at: 4, set: 'X', expected: 'hellX' },
      { name: '"hello" at 10 (beyond length)', input: 'hello', at: 10, set: 'X', expected: 'helloX' },
      { name: '"hi" at 5 set "world" (beyond length)', input: 'hi', at: 5, set: 'world', expected: 'hiworld' },
      { name: '"hello" at 1 set "" (empty replacement)', input: 'hello', at: 1, set: '', expected: 'hello' },
      { name: '"abc" at 0 set "" (empty replacement)', input: 'abc', at: 0, set: '', expected: 'abc' },
    ]

    it.each(testCases)(
      'SET_CHAR_AT($name) -> "$expected"',
      ({ input, at, set, expected }) => {
        expect(SET_CHAR_AT({ input, at, set })).toBe(expected)
      }
    )
  }
)
