import { describe, expect, it } from 'bun:test'
import { TO_ARRAY } from '../../ts/convert/to-array.util.js'

describe(
  'TO_ARRAY',
  () => {
    it.each<{ name: string, input: unknown[] }>([
      { name: 'number array', input: [1, 2, 3] },
      { name: 'empty array', input: [] },
      { name: 'string array', input: ['a', 'b', 'c'] },
    ])(
      'should return arrays as-is (same instance) for $name',
      ({ input }) => {
        expect(TO_ARRAY(input)).toBe(input)
      }
    )

    it.each<{ name: string, input: unknown, expected: unknown[] }>([
      { name: 'convert an array-like string', input: 'hello', expected: ['h', 'e', 'l', 'l', 'o'] },
      { name: 'convert an array-like object', input: { 0: 'a', 1: 'b', 2: 'c', length: 3 }, expected: ['a', 'b', 'c'] },
      { name: 'convert a Set iterable', input: new Set([1, 2, 3]), expected: [1, 2, 3] },
      { name: 'convert a Map iterable', input: new Map([['a', 1], ['b', 2]]), expected: [['a', 1], ['b', 2]] },
      { name: 'return empty array for non-convertible null', input: null, expected: [] },
      { name: 'return empty array for non-convertible undefined', input: undefined, expected: [] },
      { name: 'return empty array for non-convertible number', input: 42, expected: [] },
      { name: 'return empty array for non-convertible plain object', input: {}, expected: [] },
      { name: 'return empty array for non-convertible boolean', input: true, expected: [] },
      // edge cases: objects with length but no indexed properties
      { name: 'handle an object with length 0', input: { length: 0 }, expected: [] },
      { name: 'handle an object with length 3 and no indexed properties', input: { length: 3 }, expected: [undefined, undefined, undefined] },
    ])(
      'should $name',
      ({ input, expected }) => {
        expect(TO_ARRAY(input)).toStrictEqual(expected)
      }
    )
  }
)
