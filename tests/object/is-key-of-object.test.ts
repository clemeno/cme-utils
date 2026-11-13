import { describe, expect, it } from 'bun:test'
import { IS_KEY_OF_OBJECT } from '../../ts/object/is-key-of-object.util.js'

describe(
  'IS_KEY_OF_OBJECT',
  () => {
    const testCases: Array<{ name: string, input: { key: string | number, of: unknown }, expected: boolean }> = [
      { name: 'key "a" in { a:1, b:2 }', input: { key: 'a', of: { a: 1, b: 2 } }, expected: true },
      { name: 'key 0 in { 0:"zero", 1:"one" }', input: { key: 0, of: { 0: 'zero', 1: 'one' } }, expected: true },
      { name: 'key 1 (numeric) in { 1:"one" }', input: { key: 1, of: { 1: 'one' } }, expected: true },
      { name: 'key "1" (string) in { 1:"one" }', input: { key: '1', of: { 1: 'one' } }, expected: true },
      { name: 'key "c" not in { a:1, b:2 }', input: { key: 'c', of: { a: 1, b: 2 } }, expected: false },
      { name: 'key 2 not in { 0:"zero", 1:"one" }', input: { key: 2, of: { 0: 'zero', 1: 'one' } }, expected: false },
      { name: 'key "a" in null', input: { key: 'a', of: null }, expected: false },
      { name: 'key "a" in undefined', input: { key: 'a', of: undefined }, expected: false },
    ]

    it.each(testCases)(
      'IS_KEY_OF_OBJECT($name) -> $expected',
      ({ input, expected }) => {
        expect(IS_KEY_OF_OBJECT(input)).toBe(expected)
      }
    )
  }
)
