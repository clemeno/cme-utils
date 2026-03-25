import { describe, expect, it } from 'bun:test'
import { WHERE_NULL } from '../../ts/query/where-null.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_NULL',
  () => {
    const testCases = [
      { name: 'calls whereNull for a timestamp column', column: 'deleted_at' },
      { name: 'calls whereNull for a foreign key column', column: 'parent_id' },
      { name: 'calls whereNull for a string column', column: 'email' },
    ]

    it.each(testCases)(
      '$name',
      ({ column }) => {
        const { qb, calls } = makeMockQb()
        WHERE_NULL({ qb, column })
        expect(calls).toEqual([{ method: 'whereNull', args: [column] }])
      }
    )
  }
)
