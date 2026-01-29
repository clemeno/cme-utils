import { describe, expect, it } from 'bun:test'
import { TO_STRING } from '../../ts/convert/to-string.util.js'

describe(
  'TO_STRING',
  () => {
    const testCases = [
      { name: 'should convert string "hello" to "hello"', input: 'hello', expected: 'hello' },
      { name: 'should convert empty string to empty string', input: '', expected: '' },
      { name: 'should convert string "123" to "123"', input: '123', expected: '123' },
      { name: 'should convert number 123 to "123"', input: 123, expected: '123' },
      { name: 'should convert number 0 to "0"', input: 0, expected: '0' },
      { name: 'should convert number -123 to "-123"', input: -123, expected: '-123' },
      { name: 'should convert number 123.45 to "123.45"', input: 123.45, expected: '123.45' },
      { name: 'should convert boolean true to "true"', input: true, expected: 'true' },
      { name: 'should convert boolean false to "false"', input: false, expected: 'false' },
      { name: 'should convert object { a: 1, b: 2 } to JSON string', input: { a: 1, b: 2 }, expected: '{"a":1,"b":2}' },
      { name: 'should convert array [1, 2, 3] to JSON string', input: [1, 2, 3], expected: '[1,2,3]' },
      { name: 'should convert null to empty string', input: null, expected: '' },
      { name: 'should convert undefined to empty string', input: undefined, expected: '' },
      { name: 'should convert NaN to empty string', input: NaN, expected: '' },
      { name: 'should convert Buffer to string', input: Buffer.from('hello'), expected: 'hello' },
      { name: 'should convert Symbol to string', input: Symbol('test'), expected: 'Symbol(test)' },
      { name: 'should convert BigInt to string', input: BigInt(123), expected: '123' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_STRING(input)).toBe(expected)
      }
    )
  }
)
