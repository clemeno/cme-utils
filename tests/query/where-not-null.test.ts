import { describe, expect, it } from 'bun:test'
import { WHERE_NOT_NULL } from '../../ts/query/where-not-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_NOT_NULL',
  () => {
    it(
      'calls qb.whereNotNull with the given column',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_NULL({ qb, column: 'verified_at' })
        expect(calls).toHaveLength(1)
        expect(calls[0].method).toBe('whereNotNull')
        expect(calls[0].args[0]).toBe('verified_at')
      }
    )
  }
)
