import { describe, expect, it } from 'bun:test'
import { TO_UNIQUE_ARRAY } from '../../ts/convert/to-unique-array.util.js'

/** builds `[inItem, a distinct but structurally equal copy, inItem again]` to exercise reference equality */
function withRepeatedReference (inItem: Record<string, unknown>): Array<Record<string, unknown>> {
  return [inItem, { ...inItem }, inItem]
}

describe(
  'TO_UNIQUE_ARRAY',
  () => {
    it.each<{ name: string, input: { from: unknown[], on?: (inElement: any) => unknown }, expected: unknown[] }>([
      { name: 'removes duplicate numbers', input: { from: [1, 2, 2, 3, 1] }, expected: [1, 2, 3] },
      { name: 'removes duplicate strings', input: { from: ['a', 'b', 'a', 'c'] }, expected: ['a', 'b', 'c'] },
      { name: 'removes duplicate booleans', input: { from: [true, false, true] }, expected: [true, false] },
      { name: 'keeps an array with no duplicates', input: { from: [1, 2, 3] }, expected: [1, 2, 3] },
      { name: 'keeps an empty array', input: { from: [] }, expected: [] },
      {
        name: 'removes duplicates based on custom function',
        input: {
          from: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
            { id: 1, name: 'Johnny' },
          ],
          on: item => item.id,
        },
        expected: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
        ],
      },
      { name: 'handles objects with reference equality', input: { from: withRepeatedReference({ a: 1 }) }, expected: [{ a: 1 }, { a: 1 }] },
      { name: 'handles mixed types', input: { from: [1, '1', 1, '1'] }, expected: [1, '1'] },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(TO_UNIQUE_ARRAY(input)).toEqual(expected)
      }
    )
  }
)
