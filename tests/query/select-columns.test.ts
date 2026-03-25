import { describe, expect, it } from 'bun:test'
import { SELECT_COLUMNS } from '../../ts/query/select-columns.util.js'

describe(
  'SELECT_COLUMNS',
  () => {
    const testCases: Array<{ name: string, input: Record<string, string[]>, expected: string[] }> = [
      { name: 'multiple aliases and columns → alias.column pairs', input: { users: ['id', 'name'], posts: ['title'] }, expected: ['users.id', 'users.name', 'posts.title'] },
      { name: 'empty object → empty array', input: {}, expected: [] },
      { name: 'alias with no columns → empty array', input: { users: [] }, expected: [] },
      { name: 'single alias, single column → one entry', input: { t: ['id'] }, expected: ['t.id'] },
      { name: 'multiple aliases preserve insertion order', input: { a: ['x', 'y'], b: ['z'] }, expected: ['a.x', 'a.y', 'b.z'] },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(SELECT_COLUMNS(input)).toEqual(expected)
      }
    )
  }
)
