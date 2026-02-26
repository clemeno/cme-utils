import { describe, expect, it } from 'bun:test'
import { SELECT_COLUMNS_IN_ORDER } from '../../ts/query/select-columns-in-order.util.js'

describe(
  'SELECT_COLUMNS_IN_ORDER',
  () => {
    it(
      'returns columns in the order specified',
      () => {
        const result = SELECT_COLUMNS_IN_ORDER({
          aliasColumns: { users: ['id', 'name'], posts: ['title'] },
          order: ['name', 'id'],
        })
        expect(result).toEqual(['users.name', 'users.id'])
      }
    )

    it(
      'includes columns from different aliases respecting order',
      () => {
        const result = SELECT_COLUMNS_IN_ORDER({
          aliasColumns: { users: ['id', 'name'], posts: ['title'] },
          order: ['title', 'name', 'id'],
        })
        expect(result).toEqual(['posts.title', 'users.name', 'users.id'])
      }
    )

    it(
      'unknown column in order is silently skipped',
      () => {
        const result = SELECT_COLUMNS_IN_ORDER({
          aliasColumns: { users: ['id', 'name'] },
          order: ['id', 'unknown', 'name'],
        })
        expect(result).toEqual(['users.id', 'users.name'])
      }
    )

    it(
      'empty order returns []',
      () => {
        const result = SELECT_COLUMNS_IN_ORDER({
          aliasColumns: { users: ['id', 'name'] },
          order: [],
        })
        expect(result).toEqual([])
      }
    )
  }
)
