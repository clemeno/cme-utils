import { describe, expect, it } from 'bun:test'
import { WHERE_NOT_NULL } from '../../ts/query/where-not-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_NOT_NULL',
  () => {
    const testCases = [
      { name: 'calls whereNotNull for a timestamp column', column: 'verified_at' },
      { name: 'calls whereNotNull for a foreign key column', column: 'user_id' },
      { name: 'calls whereNotNull for a string column', column: 'name' },
    ]

    it.each(testCases)(
      '$name',
      ({ column }) => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_NULL({ qb, column })
        expect(calls).toEqual([{ method: 'whereNotNull', args: [column] }])
      }
    )
  }
)
