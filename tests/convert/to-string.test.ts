import { describe, expect, it } from 'bun:test'
import { TO_STRING } from '../../ts/convert/to-string.util.js'

// a Buffer polyfill (the buffer package in a browser bundle) is not on globalThis: TO_STRING knows it by its class
class PolyfilledBuffer {
  static isBuffer (v: unknown): boolean {
    return v instanceof PolyfilledBuffer
  }

  toString (): string {
    return 'hello'
  }
}

// a class whose isBuffer exists and throws
class ThrowingBuffer {
  static isBuffer (): boolean {
    throw new Error('isBuffer broke')
  }
}

describe(
  'TO_STRING',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: string }> = [
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
      { name: 'should convert a polyfilled Buffer to string', input: new PolyfilledBuffer(), expected: 'hello' },
      { name: 'should convert an object whose constructor.isBuffer is no function to JSON', input: { constructor: { isBuffer: true } }, expected: '{"constructor":{"isBuffer":true}}' },
      { name: 'should convert Symbol to string', input: Symbol('test'), expected: 'Symbol(test)' },
      { name: 'should convert BigInt to string', input: BigInt(123), expected: '123' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_STRING(input)).toBe(expected)
      }
    )

    it('should let the error of an isBuffer that throws through', () => {
      expect(() => TO_STRING(new ThrowingBuffer())).toThrow(new Error('isBuffer broke'))
    })
  }
)
