import { describe, expect, it } from 'bun:test'
import { WHERE_NULL } from '../../ts/query/where-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_NULL',
  () => {
    it(
      'calls qb.whereNull with the given column',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_NULL({ qb, column: 'deleted_at' })
        expect(calls).toHaveLength(1)
        expect(calls[0].method).toBe('whereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )
  }
)
