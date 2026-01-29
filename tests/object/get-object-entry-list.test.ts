import { describe, expect, it } from 'bun:test'
import { GET_OBJECT_ENTRY_LIST } from '../../ts/object/get-object-entry-list.util.js'

describe(
  'GET_OBJECT_ENTRY_LIST',
  () => {
    it(
      'should return object entries as array of key-value pairs',
      () => {
        const obj = { a: 1, b: 2, c: 3 }
        const result = GET_OBJECT_ENTRY_LIST(obj)

        expect(result).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(Array.isArray(result)).toBe(true)
      }
    )

    it(
      'should handle empty objects',
      () => {
        const obj = {}
        const result = GET_OBJECT_ENTRY_LIST(obj)

        expect(result).toEqual([])
        expect(Array.isArray(result)).toBe(true)
      }
    )

    it(
      'should handle objects with different value types',
      () => {
        const obj = {
          string: 'hello',
          number: 42,
          boolean: true,
          null: null,
          undefined,
          array: [1, 2, 3],
          object: { nested: 'value' },
        }
        const result = GET_OBJECT_ENTRY_LIST(obj)

        expect(result).toEqual([
          ['string', 'hello'],
          ['number', 42],
          ['boolean', true],
          ['null', null],
          ['undefined', undefined],
          ['array', [1, 2, 3]],
          ['object', { nested: 'value' }],
        ])
      }
    )

    it(
      'should handle objects with symbol keys',
      () => {
        const symbolKey = Symbol('test')
        const obj = { [symbolKey]: 'symbol value', normal: 'normal value' }
        const result = GET_OBJECT_ENTRY_LIST(obj)

        // Symbol keys are not included in Object.entries
        expect(result).toEqual([['normal', 'normal value']])
      }
    )

    it(
      'should handle objects with non-enumerable properties',
      () => {
        const obj = { enumerable: 'yes' }
        Object.defineProperty(obj, 'nonEnumerable', {
          value: 'no',
          enumerable: false,
        })

        const result = GET_OBJECT_ENTRY_LIST(obj)
        expect(result).toEqual([['enumerable', 'yes']])
      }
    )

    it(
      'should return an array',
      () => {
        const result = GET_OBJECT_ENTRY_LIST({ a: 1 })
        expect(Array.isArray(result)).toBe(true)
      }
    )

    it(
      'should handle null and undefined',
      () => {
        expect(() => GET_OBJECT_ENTRY_LIST(null as any)).toThrow()
        expect(() => GET_OBJECT_ENTRY_LIST(undefined as any)).toThrow()
      }
    )
  }
)
