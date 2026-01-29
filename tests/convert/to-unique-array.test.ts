import { describe, expect, it } from 'bun:test'
import { TO_UNIQUE_ARRAY } from '../../ts/convert/to-unique-array.util.js'

describe(
  'TO_UNIQUE_ARRAY',
  () => {
    it(
      'should remove duplicate primitive values',
      () => {
        expect(TO_UNIQUE_ARRAY({ from: [1, 2, 2, 3, 1] })).toEqual([1, 2, 3])
        expect(TO_UNIQUE_ARRAY({ from: ['a', 'b', 'a', 'c'] })).toEqual(['a', 'b', 'c'])
        expect(TO_UNIQUE_ARRAY({ from: [true, false, true] })).toEqual([true, false])
      }
    )

    it(
      'should handle arrays with no duplicates',
      () => {
        expect(TO_UNIQUE_ARRAY({ from: [1, 2, 3] })).toEqual([1, 2, 3])
        expect(TO_UNIQUE_ARRAY({ from: [] })).toEqual([])
      }
    )

    it(
      'should remove duplicates based on custom function',
      () => {
        const array = [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 1, name: 'Johnny' },
        ]
        const result = TO_UNIQUE_ARRAY({
          from: array,
          on: item => item.id,
        })
        expect(result).toEqual([
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
        ])
      }
    )

    it(
      'should handle objects with reference equality',
      () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 1 }
        const obj3 = obj1
        expect(TO_UNIQUE_ARRAY({ from: [obj1, obj2, obj3] })).toEqual([obj1, obj2])
      }
    )

    it(
      'should handle mixed types',
      () => {
        expect(TO_UNIQUE_ARRAY({ from: [1, '1', 1, '1'] })).toEqual([1, '1'])
      }
    )
  }
)
