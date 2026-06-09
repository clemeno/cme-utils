import { describe, expect, it } from 'bun:test'
import { FROM_PHP_UNSERIALIZE } from '../../ts/convert/php-serialize.util.js'
import { TO_PHP_SERIALIZE } from '../../ts/convert/php-serialize.util.js'
import { TO_UTF8_DECODED } from '../../ts/convert/php-serialize.util.js'

describe(
  'TO_PHP_SERIALIZE',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: string }> = [
      { name: 'null', input: null, expected: 'N;' },
      { name: 'boolean true', input: true, expected: 'b:1;' },
      { name: 'boolean false', input: false, expected: 'b:0;' },
      { name: 'integer', input: 42, expected: 'i:42;' },
      { name: 'negative integer', input: -7, expected: 'i:-7;' },
      { name: 'float', input: 3.14, expected: 'd:3.14;' },
      { name: 'empty string', input: '', expected: 's:0:"";' },
      { name: 'ascii string', input: 'hello', expected: 's:5:"hello";' },
      { name: 'empty array', input: [], expected: 'a:0:{}' },
      { name: 'indexed array', input: [1, 'two'], expected: 'a:2:{i:0;i:1;i:1;s:3:"two";}' },
      { name: 'plain object', input: { a: 1, b: 'x' }, expected: 'a:2:{s:1:"a";i:1;s:1:"b";s:1:"x";}' },
      // eslint-disable-next-line no-new-wrappers
      { name: 'boxed boolean', input: new Boolean(true), expected: 'b:1;' },
      // eslint-disable-next-line no-new-wrappers
      { name: 'boxed number', input: new Number(7), expected: 'i:7;' },
      { name: 'string with 2-byte UTF-8 char', input: 'é', expected: 's:2:"é";' },
      { name: 'string with 3-byte UTF-8 char', input: '€', expected: 's:3:"€";' },
      { name: 'function', input: Number.isNaN, expected: ';' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_PHP_SERIALIZE(input)).toBe(expected)
      }
    )

    it('object without constructor (Object.create(null))', () => {
      const nullObj = Object.create(null) as Record<string, unknown>
      nullObj['x'] = 1
      expect(TO_PHP_SERIALIZE(nullObj)).toBe('a:1:{s:1:"x";i:1;}')
    })
  }
)

describe(
  'FROM_PHP_UNSERIALIZE',
  () => {
    const testCases: Array<{ name: string, input: string, expected: unknown }> = [
      { name: 'null', input: 'N;', expected: null },
      { name: 'boolean true', input: 'b:1;', expected: true },
      { name: 'boolean false', input: 'b:0;', expected: false },
      { name: 'integer', input: 'i:42;', expected: 42 },
      { name: 'negative integer', input: 'i:-7;', expected: -7 },
      { name: 'float', input: 'd:3.14;', expected: 3.14 },
      { name: 'empty string', input: 's:0:"";', expected: '' },
      { name: 'ascii string', input: 's:5:"hello";', expected: 'hello' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_PHP_UNSERIALIZE(input)).toBe(expected)
      }
    )

    it('indexed array', () => {
      const result = FROM_PHP_UNSERIALIZE('a:2:{i:0;i:1;i:1;s:3:"two";}')
      const resultObj = result as Record<number, unknown>
      expect(resultObj[0]).toBe(1)
      expect(resultObj[1]).toBe('two')
    })

    it('throws on unknown type token', () => {
      expect(() => FROM_PHP_UNSERIALIZE('x:1;')).toThrow()
    })

    it('object with string key', () => {
      const result = FROM_PHP_UNSERIALIZE('a:1:{s:3:"foo";i:42;}')
      const resultObj = result as Record<string, unknown>
      expect(resultObj['foo']).toBe(42)
    })

    it('nested array', () => {
      const result = FROM_PHP_UNSERIALIZE('a:1:{i:0;a:2:{i:0;i:1;i:1;i:2;}}')
      const resultObj = result as Record<string, unknown>
      const inner = resultObj['0'] as Record<string, unknown>
      expect(inner['0']).toBe(1)
      expect(inner['1']).toBe(2)
    })

    it('throws on unexpected end of data', () => {
      expect(() => FROM_PHP_UNSERIALIZE('i:42')).toThrow()
    })
  }
)

describe(
  'Round-trip TO_PHP_SERIALIZE → FROM_PHP_UNSERIALIZE',
  () => {
    const roundTripCases: Array<{ name: string, input: null | boolean | number | string }> = [
      { name: 'null', input: null },
      { name: 'boolean true', input: true },
      { name: 'boolean false', input: false },
      { name: 'integer', input: 42 },
      { name: 'float', input: 1.5 },
      { name: 'empty string', input: '' },
      { name: 'ascii string', input: 'hello world' },
    ]

    it.each(roundTripCases)(
      '$name',
      ({ input }) => {
        expect(FROM_PHP_UNSERIALIZE(TO_PHP_SERIALIZE(input))).toBe(input)
      }
    )
  }
)

describe(
  'TO_UTF8_DECODED',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'empty string', input: '', expected: '' },
      { name: 'ascii only', input: 'hello', expected: 'hello' },
      { name: '2-byte UTF-8 sequence (é)', input: String.fromCharCode(0xC3, 0xA9), expected: 'é' },
      { name: '3-byte UTF-8 sequence (€)', input: String.fromCharCode(0xE2, 0x82, 0xAC), expected: '€' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_UTF8_DECODED(input)).toBe(expected)
      }
    )
  }
)
