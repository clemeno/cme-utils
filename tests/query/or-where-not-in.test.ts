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

    it(
      'empty values array → one outer orWhere call, no inner calls',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'col', values: [] })
        expect(calls).toHaveLength(1)
        expect(calls[0].method).toBe('orWhere')
        expect(typeof calls[0].args[0]).toBe('function')
      }
    )

    it(
      'single plain value → outer orWhere callback + one inner whereNot',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'role', values: ['foo'] })
        expect(calls[0].method).toBe('orWhere')
        const innerNot = calls.filter(c => c.method === 'whereNot')
        expect(innerNot).toHaveLength(1)
        expect(innerNot[0].args).toEqual(['role', '=', 'foo'])
      }
    )

    it(
      'Map input → IS_A_MAP branch iterates Map.values() inside callback',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'n', values: new Map([['k', 'v1']]) })
        const innerNot = calls.filter(c => c.method === 'whereNot')
        expect(innerNot).toHaveLength(1)
        expect(innerNot[0].args).toEqual(['n', '=', 'v1'])
      }
    )

    it(
      'Set input → iterates all entries inside callback',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'tag', values: new Set(['p', 'q']) })
        const innerNot = calls.filter(c => c.method === 'whereNot')
        expect(innerNot).toHaveLength(2)
        const vals = innerNot.map(c => c.args[2])
        expect(vals).toContain('p')
        expect(vals).toContain('q')
      }
    )

    it(
      'mixed sentinels + plain inside callback → correct inner call sequence',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'col', values: ['§§not0§§', '§§null§§', 'active'] })
        const inner = calls.filter(c => c.method !== 'orWhere')
        expect(inner[0].method).toBe('where')
        expect(inner[0].args).toEqual(['col', '=', 0])
        expect(inner[1].method).toBe('whereNull')
        expect(inner[1].args[0]).toBe('col')
        expect(inner[2].method).toBe('whereNot')
        expect(inner[2].args).toEqual(['col', '=', 'active'])
      }
    )

    it(
      'uppercase §§NOT0§§ inside callback → qb.where(col, "=", 0) (case-insensitive)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'status', values: ['§§NOT0§§'] })
        const innerWhere = calls.filter(c => c.method === 'where')
        expect(innerWhere).toHaveLength(1)
        expect(innerWhere[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'uppercase §§NULL§§ inside callback → qb.whereNull (case-insensitive)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'deleted_at', values: ['§§NULL§§'] })
        const nullCalls = calls.filter(c => c.method === 'whereNull')
        expect(nullCalls).toHaveLength(1)
        expect(nullCalls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'N plain values → N+1 total calls (1 outer orWhere + N inner whereNot)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column: 'col', values: ['a', 'b', 'c'] })
        expect(calls).toHaveLength(4)
        expect(calls[0].method).toBe('orWhere')
        expect(calls.filter(c => c.method === 'whereNot')).toHaveLength(3)
      }
    )
  }
)
