import { describe, expect, it } from 'bun:test'
import { SELECT_COLUMNS_IN_ORDER } from '../../ts/query/select-columns-in-order.util.js'

describe(
  'SELECT_COLUMNS_IN_ORDER',
  () => {
    const testCases: Array<{ name: string, aliasColumns: Record<string, string[]>, order: string[], expected: string[] }> = [
      { name: 'returns columns in the order specified', aliasColumns: { users: ['id', 'name'], posts: ['title'] }, order: ['name', 'id'], expected: ['users.name', 'users.id'] },
      { name: 'includes columns from different aliases respecting order', aliasColumns: { users: ['id', 'name'], posts: ['title'] }, order: ['title', 'name', 'id'], expected: ['posts.title', 'users.name', 'users.id'] },
      { name: 'column present in several aliases → first alias wins', aliasColumns: { u: ['id'], p: ['id', 'title'] }, order: ['id', 'title'], expected: ['u.id', 'p.title'] },
      { name: 'unknown column in order is silently skipped', aliasColumns: { users: ['id', 'name'] }, order: ['id', 'unknown', 'name'], expected: ['users.id', 'users.name'] },
      { name: 'empty order → []', aliasColumns: { users: ['id', 'name'] }, order: [], expected: [] },
      { name: 'no aliases → []', aliasColumns: {}, order: ['id'], expected: [] },
    ]

    it.each(testCases)(
      '$name',
      ({ aliasColumns, order, expected }) => {
        expect(SELECT_COLUMNS_IN_ORDER({ aliasColumns, order })).toEqual(expected)
      }
    )
  }
)
