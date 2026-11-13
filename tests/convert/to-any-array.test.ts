import { describe, expect, it } from 'bun:test'
import { TO_ANY_ARRAY } from '../../ts/convert/to-any-array.util.js'

describe(
  'TO_ANY_ARRAY',
  () => {
    it(
      'returns an array as-is (reference identity)',
      () => {
        const arr = [1, 2, 3]
        expect(TO_ANY_ARRAY(arr)).toBe(arr)
      }
    )

    const testCases: Array<{ name: string, input: unknown, expected: number[] | string[] }> = [
      { name: 'Uint8Array([10,20,30])', input: new Uint8Array([10, 20, 30]), expected: [10, 20, 30] },
      { name: 'Buffer([1,2,3])', input: Buffer.from([1, 2, 3]), expected: [1, 2, 3] },
      { name: '"abc" (string iterable)', input: 'abc', expected: ['a', 'b', 'c'] },
      { name: 'new Set([1,2,3])', input: new Set([1, 2, 3]), expected: [1, 2, 3] },
      { name: 'array-like {length:3,0:"x",...}', input: { length: 3, 0: 'x', 1: 'y', 2: 'z' }, expected: ['x', 'y', 'z'] },
      { name: 'null', input: null, expected: [] },
      { name: 'undefined', input: undefined, expected: [] },
      { name: '42 (number)', input: 42, expected: [] },
      { name: '{ a: 1 } (plain object, no length)', input: { a: 1 }, expected: [] },
    ]

    it.each(testCases)(
      'TO_ANY_ARRAY($name)',
      ({ input, expected }) => {
        expect(TO_ANY_ARRAY(input)).toEqual(expected)
      }
    )
  }
)
