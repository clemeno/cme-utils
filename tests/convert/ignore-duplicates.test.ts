import { describe, expect, it } from 'bun:test'
import { IGNORE_DUPLICATES } from '../../ts/convert/ignore-duplicates.util.js'

describe(
  'IGNORE_DUPLICATES',
  () => {
    it('removes duplicate primitive values', () => {
      const result = [1, 2, 2, 3, 1, 3].filter(IGNORE_DUPLICATES(e => e))
      expect(result).toEqual([1, 2, 3])
    })

    it('keeps all elements when there are no duplicates', () => {
      const result = [1, 2, 3].filter(IGNORE_DUPLICATES(e => e))
      expect(result).toEqual([1, 2, 3])
    })

    it('handles empty array', () => {
      const result = ([] as number[]).filter(IGNORE_DUPLICATES(e => e))
      expect(result).toEqual([])
    })

    it('removes duplicate strings', () => {
      const result = ['a', 'b', 'a', 'c', 'b'].filter(IGNORE_DUPLICATES(e => e))
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('deduplicates by a property of objects', () => {
      const arr = [{ id: 1, v: 'a' }, { id: 2, v: 'b' }, { id: 1, v: 'c' }]
      const result = arr.filter(IGNORE_DUPLICATES(e => e.id))
      expect(result).toEqual([{ id: 1, v: 'a' }, { id: 2, v: 'b' }])
    })

    it('deduplicates using a computed key', () => {
      const arr = ['foo', 'bar', 'baz', 'FOO']
      const result = arr.filter(IGNORE_DUPLICATES(e => e.toLowerCase()))
      expect(result).toEqual(['foo', 'bar', 'baz'])
    })

    it('each returned function maintains independent state', () => {
      const filter1 = IGNORE_DUPLICATES((e: number) => e)
      const filter2 = IGNORE_DUPLICATES((e: number) => e)

      ;[1, 2].filter(filter1)

      // filter2 has not seen 1 or 2 yet
      expect([1, 2, 3].filter(filter2)).toEqual([1, 2, 3])
    })

    it('preserves first occurrence when there are duplicates', () => {
      const arr = [
        { id: 1, label: 'first' },
        { id: 1, label: 'second' },
      ]
      const result = arr.filter(IGNORE_DUPLICATES(e => e.id))
      expect(result).toHaveLength(1)
      expect(result[0].label).toBe('first')
    })
  }
)
