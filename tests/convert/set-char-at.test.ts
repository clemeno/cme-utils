import { describe, expect, it } from 'bun:test'
import { SET_CHAR_AT } from '../../ts/convert/set-char-at.util.js'

describe(
  'SET_CHAR_AT',
  () => {
    const testCases = [
      { label: '"hello" at 1 set "a"', input: 'hello', at: 1, set: 'a', expected: 'hallo' },
      { label: '"world" at 0 set "H"', input: 'world', at: 0, set: 'H', expected: 'Horld' },
      { label: '"test" at 3 set "x"', input: 'test', at: 3, set: 'x', expected: 'tesx' },
      { label: '"hello" at 1 set "abc" (multi-char)', input: 'hello', at: 1, set: 'abc', expected: 'habco' },
      { label: '"world" at 0 set "Hi" (multi-char)', input: 'world', at: 0, set: 'Hi', expected: 'Hirld' },
      { label: '"hello" at 0 (start)', input: 'hello', at: 0, set: 'X', expected: 'Xello' },
      { label: '"hello" at 4 (end)', input: 'hello', at: 4, set: 'X', expected: 'hellX' },
      { label: '"hello" at 10 (beyond length)', input: 'hello', at: 10, set: 'X', expected: 'helloX' },
      { label: '"hi" at 5 set "world" (beyond length)', input: 'hi', at: 5, set: 'world', expected: 'hiworld' },
      { label: '"hello" at 1 set "" (empty replacement)', input: 'hello', at: 1, set: '', expected: 'hello' },
      { label: '"abc" at 0 set "" (empty replacement)', input: 'abc', at: 0, set: '', expected: 'abc' },
    ]

    it.each(testCases)(
      'SET_CHAR_AT($label) -> "$expected"',
      ({ input, at, set, expected }) => {
        expect(SET_CHAR_AT({ input, at, set })).toBe(expected)
      }
    )
  }
)
