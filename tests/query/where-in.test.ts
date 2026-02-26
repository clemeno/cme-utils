import { describe, expect, it } from 'bun:test'
import { WHERE_IN } from '../../ts/query/where-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_IN',
  () => {
    it(
      'single plain value → qb.where(col, "=", val)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'id', values: [42] })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args).toEqual(['id', '=', 42])
      }
    )

    it(
      'single §§not0§§ → qb.whereNot(col, "=", 0)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'status', values: ['§§not0§§'] })
        expect(calls[0].method).toBe('whereNot')
        expect(calls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'single §§null§§ → qb.whereNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'deleted_at', values: ['§§null§§'] })
        expect(calls[0].method).toBe('whereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'multiple values → qb.where callback with orWhere for each',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'role', values: ['admin', 'editor'] })
        // First call is qb.where(callback)
        expect(calls[0].method).toBe('where')
        expect(typeof calls[0].args[0]).toBe('function')
        // After callback executes, orWhere calls follow
        const orCalls = calls.filter(c => c.method === 'orWhere')
        expect(orCalls).toHaveLength(2)
        expect(orCalls[0].args).toEqual(['role', '=', 'admin'])
        expect(orCalls[1].args).toEqual(['role', '=', 'editor'])
      }
    )

    it(
      'multiple values with §§not0§§ → orWhereNot for that value',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'status', values: ['§§not0§§', 1] })
        const orNotCalls = calls.filter(c => c.method === 'orWhereNot')
        expect(orNotCalls).toHaveLength(1)
        expect(orNotCalls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'multiple values with §§null§§ → orWhereNull for that value',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'deleted_at', values: ['§§null§§', 1] })
        const orNullCalls = calls.filter(c => c.method === 'orWhereNull')
        expect(orNullCalls).toHaveLength(1)
        expect(orNullCalls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'Map values are iterated',
      () => {
        const { qb, calls } = makeMockQb()
        const values = new Map([['a', 1], ['b', 2]])
        WHERE_IN({ qb, column: 'n', values })
        const whereCalls = calls.filter(c => c.method === 'orWhere')
        expect(whereCalls).toHaveLength(2)
      }
    )
  }
)
