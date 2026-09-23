import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NOT_NULL } from '../../ts/query/or-where-not-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NOT_NULL',
  () => {
    const testCases = [
      { name: 'calls orWhereNotNull for a timestamp column', column: 'verified_at' },
      { name: 'calls orWhereNotNull for a foreign key column', column: 'user_id' },
      { name: 'calls orWhereNotNull for a string column', column: 'email' },
    ]

    it.each(testCases)(
      '$name',
      ({ column }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_NULL({ qb, column })
        expect(calls).toEqual([{ method: 'orWhereNotNull', args: [column] }])
      }
    )
  }
)
