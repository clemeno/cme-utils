import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NULL } from '../../ts/query/or-where-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NULL',
  () => {
    it(
      'calls qb.orWhereNull with the given column',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NULL({ qb, column: 'deleted_at' })
        expect(calls).toHaveLength(1)
        expect(calls[0].method).toBe('orWhereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )
  }
)
