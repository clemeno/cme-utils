import { describe, expect, it } from 'bun:test'
import { OR_WHERE_IN } from '../../ts/query/or-where-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_IN',
  () => {
    it(
      'plain values → one orWhere per value',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'role', values: ['admin', 'editor'] })
        expect(calls).toHaveLength(2)
        expect(calls[0]).toEqual({ method: 'orWhere', args: ['role', '=', 'admin'] })
        expect(calls[1]).toEqual({ method: 'orWhere', args: ['role', '=', 'editor'] })
      }
    )

    it(
      '§§not0§§ → orWhereNot(col, "=", 0)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'status', values: ['§§not0§§'] })
        expect(calls[0].method).toBe('orWhereNot')
        expect(calls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      '§§null§§ → orWhereNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'deleted_at', values: ['§§null§§'] })
        expect(calls[0].method).toBe('orWhereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'mixed values call respective methods',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'col', values: ['§§not0§§', '§§null§§', 1] })
        expect(calls[0].method).toBe('orWhereNot')
        expect(calls[1].method).toBe('orWhereNull')
        expect(calls[2].method).toBe('orWhere')
      }
    )

    it(
      'empty values array → zero QB calls',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'col', values: [] })
        expect(calls).toHaveLength(0)
      }
    )

    it(
      'single plain value → exactly one orWhere call',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'id', values: [7] })
        expect(calls).toHaveLength(1)
        expect(calls[0]).toEqual({ method: 'orWhere', args: ['id', '=', 7] })
      }
    )

    it(
      'Map input → iterates Map.values(), not keys',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'n', values: new Map([['k1', 'a'], ['k2', 'b']]) })
        expect(calls).toHaveLength(2)
        expect(calls[0]).toEqual({ method: 'orWhere', args: ['n', '=', 'a'] })
        expect(calls[1]).toEqual({ method: 'orWhere', args: ['n', '=', 'b'] })
      }
    )

    it(
      'Set input → one orWhere per Set entry',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'tag', values: new Set(['x', 'y']) })
        expect(calls).toHaveLength(2)
        const methods = calls.map(c => c.method)
        expect(methods).toEqual(['orWhere', 'orWhere'])
      }
    )

    it(
      'uppercase §§NOT0§§ → orWhereNot (case-insensitive)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'status', values: ['§§NOT0§§'] })
        expect(calls[0].method).toBe('orWhereNot')
        expect(calls[0].args).toEqual(['status', '=', 0])
      }
    )

    it(
      'uppercase §§NULL§§ → orWhereNull (case-insensitive)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'deleted_at', values: ['§§NULL§§'] })
        expect(calls[0].method).toBe('orWhereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      'N plain values → exactly N orWhere calls',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column: 'col', values: ['a', 'b', 'c'] })
        expect(calls).toHaveLength(3)
        expect(calls.every(c => c.method === 'orWhere')).toBe(true)
      }
    )
  }
)
