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
  }
)
