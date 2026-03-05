import { describe, expect, it } from 'bun:test'
import { IS_KEY_OF_OBJECT } from '../../ts/object/is-key-of-object.util.js'

describe(
  'IS_KEY_OF_OBJECT',
  () => {
    const testCases = [
      { label: 'key "a" in { a:1, b:2 }', input: { key: 'a', of: { a: 1, b: 2 } }, expected: true },
      { label: 'key 0 in { 0:"zero", 1:"one" }', input: { key: 0, of: { 0: 'zero', 1: 'one' } }, expected: true },
      { label: 'key 1 (numeric) in { 1:"one" }', input: { key: 1, of: { 1: 'one' } }, expected: true },
      { label: 'key "1" (string) in { 1:"one" }', input: { key: '1', of: { 1: 'one' } }, expected: true },
      { label: 'key "c" not in { a:1, b:2 }', input: { key: 'c', of: { a: 1, b: 2 } }, expected: false },
      { label: 'key 2 not in { 0:"zero", 1:"one" }', input: { key: 2, of: { 0: 'zero', 1: 'one' } }, expected: false },
      { label: 'key "a" in null', input: { key: 'a', of: null }, expected: false },
      { label: 'key "a" in undefined', input: { key: 'a', of: undefined }, expected: false },
    ]

    it.each(testCases)(
      'IS_KEY_OF_OBJECT($label) -> $expected',
      ({ input, expected }) => {
        expect(IS_KEY_OF_OBJECT(input)).toBe(expected)
      }
    )
  }
)
