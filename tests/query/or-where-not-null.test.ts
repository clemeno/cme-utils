import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NOT_NULL } from '../../ts/query/or-where-not-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NOT_NULL',
  () => {
    it(
      'calls qb.orWhereNotNull with the given column',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_NULL({ qb, column: 'email' })
        expect(calls).toHaveLength(1)
        expect(calls[0].method).toBe('orWhereNotNull')
        expect(calls[0].args[0]).toBe('email')
      }
    )
  }
)
