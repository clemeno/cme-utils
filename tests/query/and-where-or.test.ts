import { describe, expect, it } from 'bun:test'
import { AND_WHERE_OR } from '../../ts/query/and-where-or.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'AND_WHERE_OR',
  () => {
    it(
      'wraps all OR conditions in a single qb.where callback',
      () => {
        const { qb, calls } = makeMockQb()
        AND_WHERE_OR({
          qb,
          or: [
            { column: 'city', value: 'Paris' },
            { column: 'city', value: 'Lyon' },
          ],
        })
        expect(calls[0].method).toBe('where')
        expect(typeof calls[0].args[0]).toBe('function')
        const orCalls = calls.filter(c => c.method === 'orWhere')
        expect(orCalls).toHaveLength(2)
        expect(orCalls[0].args).toEqual(['city', '=', 'Paris'])
        expect(orCalls[1].args).toEqual(['city', '=', 'Lyon'])
      }
    )

    it(
      'empty or array calls qb.where with a callback (no inner calls)',
      () => {
        const { qb, calls } = makeMockQb()
        AND_WHERE_OR({ qb, or: [] })
        expect(calls[0].method).toBe('where')
        expect(calls).toHaveLength(1)
      }
    )

    it(
      'single condition in or',
      () => {
        const { qb, calls } = makeMockQb()
        AND_WHERE_OR({ qb, or: [{ column: 'status', value: 'active' }] })
        const orCalls = calls.filter(c => c.method === 'orWhere')
        expect(orCalls).toHaveLength(1)
        expect(orCalls[0].args).toEqual(['status', '=', 'active'])
      }
    )

    it(
      'passes operator when provided',
      () => {
        const { qb, calls } = makeMockQb()
        AND_WHERE_OR({ qb, or: [{ column: 'age', operator: '>', value: 18 }] })
        const orCalls = calls.filter(c => c.method === 'orWhere')
        expect(orCalls[0].args).toEqual(['age', '>', 18])
      }
    )
  }
)
