import { describe, expect, it } from 'bun:test'
import { WHERE_NOT_IN } from '../../ts/query/where-not-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_NOT_IN',
  () => {
    it(
      'single plain value → qb.whereNot(col, "=", val)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'id', values: [99] })
        expect(calls[0].method).toBe('whereNot')
        expect(calls[0].args).toEqual(['id', '=', 99])
      }
    )

    it(
      'single §§not0§§ → qb.where(col, "=", 0)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'status', values: ['§§not0§§'] })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'single §§null§§ → qb.whereNotNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'deleted_at', values: ['§§null§§'] })
        expect(calls[0].method).toBe('whereNotNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'multiple values → one whereNot per value',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'role', values: ['admin', 'editor'] })
        const notCalls = calls.filter(c => c.method === 'whereNot')
        expect(notCalls).toHaveLength(2)
        expect(notCalls[0].args).toEqual(['role', '=', 'admin'])
        expect(notCalls[1].args).toEqual(['role', '=', 'editor'])
      }
    )

    it(
      'multi-value with §§not0§§ → qb.where(col, "=", 0)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'status', values: ['§§not0§§', 'active'] })
        const whereCalls = calls.filter(c => c.method === 'where')
        expect(whereCalls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'multi-value with §§null§§ → qb.whereNotNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column: 'deleted_at', values: ['§§null§§', 'x'] })
        const notNullCalls = calls.filter(c => c.method === 'whereNotNull')
        expect(notNullCalls[0].args[0]).toBe('deleted_at')
      }
    )
  }
)
