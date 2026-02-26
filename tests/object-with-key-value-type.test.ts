import { describe, expect, it } from 'bun:test'
import type { ObjectWithKeyValueType } from '../ts/object-with-key-value-type.js'

describe(
  'ObjectWithKeyValueType',
  () => {
    it(
      'creates an object where all keys map to string values',
      () => {
        const obj: ObjectWithKeyValueType<'a' | 'b', string> = { a: 'hello', b: 'world' }
        expect(obj.a).toBe('hello')
        expect(obj.b).toBe('world')
      }
    )

    it(
      'creates an object where all keys map to number values',
      () => {
        const obj: ObjectWithKeyValueType<'x' | 'y', number> = { x: 1, y: 2 }
        expect(obj.x).toBe(1)
        expect(obj.y).toBe(2)
      }
    )

    it(
      'creates an object with a single key',
      () => {
        const obj: ObjectWithKeyValueType<'flag', boolean> = { flag: true }
        expect(obj.flag).toBe(true)
      }
    )

    it(
      'creates an object where keys map to array values',
      () => {
        const obj: ObjectWithKeyValueType<'items', number[]> = { items: [1, 2, 3] }
        expect(obj.items).toHaveLength(3)
      }
    )
  }
)
