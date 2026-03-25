import { describe, expect, it } from 'bun:test'
import { AND_WHERE_OR } from '../../ts/query/and-where-or.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'AND_WHERE_OR',
  () => {
    const testCases: Array<{
      name: string
      or: Array<{ column: string, operator?: string, value: unknown }>
      expectedInner: QbCall[]
    }> = [
      { name: '2 OR conditions → where callback + 2 inner orWhere calls', or: [{ column: 'city', value: 'Paris' }, { column: 'city', value: 'Lyon' }], expectedInner: [{ method: 'orWhere', args: ['city', '=', 'Paris'] }, { method: 'orWhere', args: ['city', '=', 'Lyon'] }] },
      { name: 'empty or array → where callback with no inner calls', or: [], expectedInner: [] },
      { name: 'single condition → where callback + 1 inner orWhere', or: [{ column: 'status', value: 'active' }], expectedInner: [{ method: 'orWhere', args: ['status', '=', 'active'] }] },
      { name: 'custom operator → orWhere with that operator', or: [{ column: 'age', operator: '>', value: 18 }], expectedInner: [{ method: 'orWhere', args: ['age', '>', 18] }] },
    ]

    it.each(testCases)(
      '$name',
      ({ or, expectedInner }) => {
        const { qb, calls } = makeMockQb()
        AND_WHERE_OR({ qb, or })
        expect(calls[0].method).toBe('where')
        expect(typeof calls[0].args[0]).toBe('function')
        expect(calls.slice(1)).toEqual(expectedInner)
      }
    )
  }
)
