import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NOT_IN } from '../../ts/query/or-where-not-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NOT_IN',
  () => {
    it(
      'wraps in orWhere callback then calls whereNot per value',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'role', values: ['admin', 'editor'] })
        expect(calls[0].method).toBe('orWhere')
        expect(typeof calls[0].args[0]).toBe('function')
        const notCalls = calls.filter(c => c.method === 'whereNot')
        expect(notCalls).toHaveLength(2)
        expect(notCalls[0].args).toEqual(['role', '=', 'admin'])
        expect(notCalls[1].args).toEqual(['role', '=', 'editor'])
      }
    )

    it(
      '§§not0§§ inside callback → qb.where(col, "=", 0)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'status', values: ['§§not0§§'] })
        const innerWhere = calls.find(c => c.method === 'where' && c.args[0] !== undefined && typeof c.args[0] !== 'function')
        expect(innerWhere?.args).toEqual(['status', '=', 0])
      }
    )

    it(
      '§§null§§ inside callback → qb.whereNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'deleted_at', values: ['§§null§§'] })
        const nullCalls = calls.filter(c => c.method === 'whereNull')
        expect(nullCalls).toHaveLength(1)
        expect(nullCalls[0].args[0]).toBe('deleted_at')
      }
    )
  }
)
