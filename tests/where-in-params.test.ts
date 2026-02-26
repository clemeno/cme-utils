import { describe, expect, it } from 'bun:test'
import type { WhereInParams } from '../ts/where-in-params.js'

describe(
  'WhereInParams',
  () => {
    it(
      'creates a WhereInParams with an array of values',
      () => {
        const params: WhereInParams = {
          qb: {},
          column: 'status',
          values: ['active', 'inactive'],
        }
        expect(params.column).toBe('status')
        expect(Array.isArray(params.values)).toBe(true)
      }
    )

    it(
      'accepts a Set as values',
      () => {
        const set = new Set([1, 2, 3])
        const params: WhereInParams = {
          qb: {},
          column: 'id',
          values: set,
        }
        expect(params.values).toBe(set)
      }
    )

    it(
      'accepts a Map as values',
      () => {
        const map = new Map([['a', 1]])
        const params: WhereInParams = {
          qb: {},
          column: 'key',
          values: map,
        }
        expect(params.values).toBe(map)
      }
    )

    it(
      'accepts a readonly array as values',
      () => {
        const values = [10, 20] as const
        const params: WhereInParams = {
          qb: {},
          column: 'score',
          values,
        }
        expect(params.values).toBe(values)
      }
    )
  }
)
