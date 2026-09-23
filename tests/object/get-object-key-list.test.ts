import { describe, expect, it } from 'bun:test'
import { GET_OBJECT_KEY_LIST } from '../../ts/object/get-object-key-list.util.js'

describe(
  'GET_OBJECT_KEY_LIST',
  () => {
    const testCases: Array<{ name: string, input: Record<PropertyKey, unknown>, expected: string[] }> = [
      { name: 'returns object keys in insertion order', input: { a: 1, b: 2, c: 3 }, expected: ['a', 'b', 'c'] },
      { name: 'empty object → []', input: {}, expected: [] },
      { name: 'numeric keys come back as strings', input: { 1: 'one', 2: 'two', 'key with spaces': 'value' }, expected: ['1', '2', 'key with spaces'] },
      { name: 'symbol keys are not included', input: { [Symbol('test')]: 'symbol value', normal: 'normal value' }, expected: ['normal'] },
      { name: 'non-enumerable properties are not included', input: Object.defineProperty({ enumerable: 'yes' }, 'nonEnumerable', { value: 'no', enumerable: false }), expected: ['enumerable'] },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(GET_OBJECT_KEY_LIST(input)).toEqual(expected)
      }
    )

    it.each([
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
    ])(
      'throws on $name',
      ({ input }) => {
        expect(() => GET_OBJECT_KEY_LIST(input)).toThrow()
      }
    )
  }
)
