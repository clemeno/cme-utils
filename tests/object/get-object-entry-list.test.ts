import { describe, expect, it } from 'bun:test'
import { GET_OBJECT_ENTRY_LIST } from '../../ts/object/get-object-entry-list.util.js'

describe(
  'GET_OBJECT_ENTRY_LIST',
  () => {
    it.each<{ name: string, input: Record<PropertyKey, unknown>, expected: Array<[string, unknown]> }>([
      { name: 'should return object entries as array of key-value pairs', input: { a: 1, b: 2, c: 3 }, expected: [['a', 1], ['b', 2], ['c', 3]] },
      { name: 'should handle empty objects', input: {}, expected: [] },
      {
        name: 'should handle objects with different value types',
        input: {
          string: 'hello',
          number: 42,
          boolean: true,
          null: null,
          undefined,
          array: [1, 2, 3],
          object: { nested: 'value' },
        },
        expected: [
          ['string', 'hello'],
          ['number', 42],
          ['boolean', true],
          ['null', null],
          ['undefined', undefined],
          ['array', [1, 2, 3]],
          ['object', { nested: 'value' }],
        ],
      },
      // Symbol keys are not included in Object.entries
      { name: 'should handle objects with symbol keys', input: { [Symbol('test')]: 'symbol value', normal: 'normal value' }, expected: [['normal', 'normal value']] },
      { name: 'should handle objects with non-enumerable properties', input: Object.defineProperty({ enumerable: 'yes' }, 'nonEnumerable', { value: 'no', enumerable: false }), expected: [['enumerable', 'yes']] },
      { name: 'should return an array', input: { a: 1 }, expected: [['a', 1]] },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(GET_OBJECT_ENTRY_LIST(input)).toEqual(expected)
      }
    )

    it.each<{ name: string, input: unknown }>([
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
    ])(
      'should throw a TypeError on $name',
      ({ input }) => {
        expect(() => GET_OBJECT_ENTRY_LIST(input)).toThrow(TypeError)
      }
    )
  }
)
