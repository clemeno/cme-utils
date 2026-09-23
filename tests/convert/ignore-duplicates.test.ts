import { describe, expect, it } from 'bun:test'
import { IGNORE_DUPLICATES } from '../../ts/convert/ignore-duplicates.util.js'

describe(
  'IGNORE_DUPLICATES',
  () => {
    it.each<{ name: string, input: unknown[], on: (inElement: any) => any, expected: unknown[] }>([
      { name: 'removes duplicate primitive values', input: [1, 2, 2, 3, 1, 3], on: e => e, expected: [1, 2, 3] },
      { name: 'keeps all elements when there are no duplicates', input: [1, 2, 3], on: e => e, expected: [1, 2, 3] },
      { name: 'handles empty array', input: [], on: e => e, expected: [] },
      { name: 'removes duplicate strings', input: ['a', 'b', 'a', 'c', 'b'], on: e => e, expected: ['a', 'b', 'c'] },
      { name: 'deduplicates by a property of objects', input: [{ id: 1, v: 'a' }, { id: 2, v: 'b' }, { id: 1, v: 'c' }], on: e => e.id, expected: [{ id: 1, v: 'a' }, { id: 2, v: 'b' }] },
      { name: 'deduplicates using a computed key', input: ['foo', 'bar', 'baz', 'FOO'], on: e => e.toLowerCase(), expected: ['foo', 'bar', 'baz'] },
      { name: 'preserves first occurrence when there are duplicates', input: [{ id: 1, label: 'first' }, { id: 1, label: 'second' }], on: e => e.id, expected: [{ id: 1, label: 'first' }] },
    ])(
      '$name',
      ({ input, on, expected }) => {
        expect(input.filter(IGNORE_DUPLICATES(on))).toEqual(expected)
      }
    )

    it('each returned function maintains independent state', () => {
      const filter1 = IGNORE_DUPLICATES((e: number) => e)
      const filter2 = IGNORE_DUPLICATES((e: number) => e)

      ;[1, 2].filter(filter1)

      // filter2 has not seen 1 or 2 yet
      expect([1, 2, 3].filter(filter2)).toEqual([1, 2, 3])
    })
  }
)
