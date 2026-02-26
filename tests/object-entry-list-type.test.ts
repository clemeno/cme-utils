import { describe, expect, it } from 'bun:test'
import type { objectEntryListType } from '../ts/object-entry-list-type.js'

describe(
  'objectEntryListType',
  () => {
    it(
      'represents the entries of a simple object',
      () => {
        type Obj = { name: string; age: number }
        const entries: objectEntryListType<Obj> = Object.entries({ name: 'Alice', age: 30 }) as any
        expect(entries).toHaveLength(2)
      }
    )

    it(
      'first entry is a key-value pair',
      () => {
        type Obj = { id: number }
        const entries: objectEntryListType<Obj> = Object.entries({ id: 1 }) as any
        expect(entries[0][0]).toBe('id')
        expect(entries[0][1]).toBe(1)
      }
    )

    it(
      'works with an empty object producing an empty list',
      () => {
        type Obj = Record<never, never>
        const entries: objectEntryListType<Obj> = Object.entries({}) as any
        expect(entries).toHaveLength(0)
      }
    )
  }
)
