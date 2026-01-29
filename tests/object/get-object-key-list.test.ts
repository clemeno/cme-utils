import { describe, expect, it } from 'bun:test'
import { GET_OBJECT_KEY_LIST } from '../../ts/object/get-object-key-list.util.js'

describe(
  'GET_OBJECT_KEY_LIST',
  () => {
    it(
      'should return object keys as array',
      () => {
        const obj = { a: 1, b: 2, c: 3 }
        const result = GET_OBJECT_KEY_LIST(obj)

        expect(result).toEqual(['a', 'b', 'c'])
        expect(Array.isArray(result)).toBe(true)
      }
    )

    it(
      'should handle empty objects',
      () => {
        const obj = {}
        const result = GET_OBJECT_KEY_LIST(obj)

        expect(result).toEqual([])
        expect(Array.isArray(result)).toBe(true)
      }
    )

    it(
      'should return string keys',
      () => {
        const obj = { 1: 'one', 2: 'two', 'key with spaces': 'value' }
        const result = GET_OBJECT_KEY_LIST(obj)

        expect(result).toEqual(['1', '2', 'key with spaces'])
        expect(result.every(key => typeof key === 'string')).toBe(true)
      }
    )

    it(
      'should not include symbol keys',
      () => {
        const symbolKey = Symbol('test')
        const obj = { [symbolKey]: 'symbol value', normal: 'normal value' }
        const result = GET_OBJECT_KEY_LIST(obj)

        expect(result).toEqual(['normal'])
      }
    )

    it(
      'should not include non-enumerable properties',
      () => {
        const obj = { enumerable: 'yes' }
        Object.defineProperty(obj, 'nonEnumerable', {
          value: 'no',
          enumerable: false,
        })

        const result = GET_OBJECT_KEY_LIST(obj)
        expect(result).toEqual(['enumerable'])
      }
    )

    it(
      'should return an array of strings',
      () => {
        const result = GET_OBJECT_KEY_LIST({ a: 1, b: 2 })
        expect(Array.isArray(result)).toBe(true)
        expect(result.every(key => typeof key === 'string')).toBe(true)
      }
    )

    it(
      'should handle null and undefined',
      () => {
        expect(() => GET_OBJECT_KEY_LIST(null as any)).toThrow()
        expect(() => GET_OBJECT_KEY_LIST(undefined as any)).toThrow()
      }
    )
  }
)
