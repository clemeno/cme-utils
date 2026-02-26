import { describe, expect, it } from 'bun:test'
import { SELECT_COLUMNS } from '../../ts/query/select-columns.util.js'

describe(
  'SELECT_COLUMNS',
  () => {
    it(
      'produces alias.column pairs',
      () => {
        const result = SELECT_COLUMNS({ users: ['id', 'name'], posts: ['title'] })
        expect(result).toEqual(['users.id', 'users.name', 'posts.title'])
      }
    )

    it(
      'empty object returns []',
      () => {
        expect(SELECT_COLUMNS({})).toEqual([])
      }
    )

    it(
      'alias with no columns returns []',
      () => {
        expect(SELECT_COLUMNS({ users: [] })).toEqual([])
      }
    )

    it(
      'single alias single column',
      () => {
        expect(SELECT_COLUMNS({ t: ['id'] })).toEqual(['t.id'])
      }
    )

    it(
      'multiple aliases preserve insertion order',
      () => {
        const result = SELECT_COLUMNS({ a: ['x', 'y'], b: ['z'] })
        expect(result).toEqual(['a.x', 'a.y', 'b.z'])
      }
    )
  }
)
