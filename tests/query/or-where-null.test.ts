import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NULL } from '../../ts/query/or-where-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NULL',
  () => {
    const testCases = [
      { name: 'calls orWhereNull for a timestamp column', column: 'deleted_at' },
      { name: 'calls orWhereNull for a foreign key column', column: 'parent_id' },
      { name: 'calls orWhereNull for a string column', column: 'email' },
    ]

    it.each(testCases)(
      '$name',
      ({ column }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NULL({ qb, column })
        expect(calls).toEqual([{ method: 'orWhereNull', args: [column] }])
      }
    )
  }
)
