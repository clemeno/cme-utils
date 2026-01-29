import { describe, expect, it } from 'bun:test'
import { TO_JSON } from '../../ts/convert/to-json.util.js'

describe(
  'TO_JSON',
  () => {
    const objectTestCases = [
      { name: 'object with properties', input: { a: 1, b: 2 }, expected: '{"a":1,"b":2}' },
      { name: 'empty object', input: {}, expected: '{}' },
    ]

    it.each(objectTestCases)(
      'should convert $name to JSON string',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    const arrayTestCases = [
      { name: 'array with elements', input: [1, 2, 3], expected: '[1,2,3]' },
      { name: 'empty array', input: [], expected: '[]' },
    ]

    it.each(arrayTestCases)(
      'should convert $name to JSON string',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    const primitiveTestCases = [
      { name: 'string', input: 'hello', expected: '"hello"' },
      { name: 'empty string', input: '', expected: '""' },
      { name: 'number', input: 123, expected: '123' },
      { name: 'zero', input: 0, expected: '0' },
      { name: 'negative number', input: -42, expected: '-42' },
      { name: 'float', input: 3.14, expected: '3.14' },
      { name: 'NaN', input: NaN, expected: 'null' },
      { name: 'Infinity', input: Infinity, expected: 'null' },
      { name: 'negative Infinity', input: -Infinity, expected: 'null' },
      { name: 'boolean true', input: true, expected: 'true' },
      { name: 'boolean false', input: false, expected: 'false' },
      { name: 'null', input: null, expected: '' },
    ]

    it.each(primitiveTestCases)(
      'should convert $name to JSON string',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    const specialObjectTestCases = [
      { name: 'Date object', input: new Date('2023-01-01T00:00:00.000Z'), expected: '"2023-01-01T00:00:00.000Z"' },
      { name: 'RegExp object', input: /test/gi, expected: '{}', note: 'RegExp loses its properties' },
      { name: 'Map object', input: new Map([['key', 'value']]), expected: '{}' },
      { name: 'Set object', input: new Set([1, 2, 3]), expected: '{}' },
      { name: 'Uint8Array', input: new Uint8Array([1, 2, 3]), expected: '{"0":1,"1":2,"2":3}' },
      { name: 'BigInt', input: 123n, expected: '' },
    ]

    it.each(specialObjectTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    const complexObjectTestCases = [
      { name: 'nested object', input: { a: { b: { c: 1 } } }, expected: '{"a":{"b":{"c":1}}}' },
      { name: 'object with array', input: { items: [1, 2, 3] }, expected: '{"items":[1,2,3]}' },
      { name: 'object with mixed types', input: { str: 'hello', num: 42, bool: true, arr: [1, 2], obj: { nested: 'value' } }, expected: '{"str":"hello","num":42,"bool":true,"arr":[1,2],"obj":{"nested":"value"}}' },
      { name: 'object with unicode', input: { unicode: '🚀 🌟 ✨' }, expected: '{"unicode":"🚀 🌟 ✨"}' },
      { name: 'object with special characters', input: { special: 'a\tb\nc\r' }, expected: '{"special":"a\\tb\\nc\\r"}' },
    ]

    it.each(complexObjectTestCases)(
      'should convert $name to JSON string',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    const edgeCaseTestCases = [
      { name: 'object with toJSON method', input: { toJSON: () => 'custom' }, expected: '"custom"' },
      { name: 'object with getter', input: Object.defineProperty({}, 'dynamic', { get: () => 'value', enumerable: true }), expected: '{"dynamic":"value"}' },
      { name: 'object with non-enumerable property', input: Object.defineProperty({ visible: 'yes' }, 'hidden', { value: 'no', enumerable: false }), expected: '{"visible":"yes"}' },
      { name: 'very large number', input: Number.MAX_SAFE_INTEGER, expected: '9007199254740991' },
      { name: 'very small number', input: Number.MIN_SAFE_INTEGER, expected: '-9007199254740991' },
    ]

    it.each(edgeCaseTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        expect(TO_JSON(input)).toBe(expected)
      }
    )

    it(
      'should handle objects that throw during serialization',
      () => {
        const throwingObject = {
          toJSON () {
            throw new Error('Cannot serialize')
          },
        }
        expect(TO_JSON(throwingObject)).toBe('')
      }
    )

    it(
      'should handle deeply nested structures',
      () => {
        const deep: Record<string, unknown> = { level: 0 }
        let current: Record<string, unknown> = deep
        for (let i = 1; i <= 10; i += 1) {
          current = current[`level${i}`] = { level: i }
        }
        expect(TO_JSON(deep)).toContain('"level":0')
      }
    )

    it(
      'should handle arrays with mixed types',
      () => {
        const mixed = [1, 'string', true, null, { obj: 'value' }, [1, 2, 3]]
        expect(TO_JSON(mixed)).toBe('[1,"string",true,null,{"obj":"value"},[1,2,3]]')
      }
    )

    it(
      'should handle empty Map and Set',
      () => {
        expect(TO_JSON(new Map())).toBe('{}')
        expect(TO_JSON(new Set())).toBe('{}')
      }
    )

    it(
      'should return empty string for undefined',
      () => {
        expect(TO_JSON(undefined)).toBe('')
      }
    )

    it(
      'should handle circular references gracefully',
      () => {
        const obj: Record<string, unknown> = { a: 1 }
        obj.self = obj
        expect(TO_JSON(obj)).toBe('')
      }
    )

    it(
      'should handle functions gracefully',
      () => {
        expect(TO_JSON(() => {})).toBe('')
      }
    )

    it(
      'should handle symbols gracefully',
      () => {
        expect(TO_JSON(Symbol('test'))).toBe('')
      }
    )
  }
)
