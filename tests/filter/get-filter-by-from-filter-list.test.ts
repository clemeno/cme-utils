import { describe, expect, it } from 'bun:test'
import { GET_FILTER_BY_FROM_FILTER_LIST } from '../../ts/filter/get-filter-by-from-filter-list.util.js'
import { AppFilter } from '../../ts/app-filter.js'

describe(
  'GET_FILTER_BY_FROM_FILTER_LIST',
  () => {
    it.each<{ name: string, input: Parameters<typeof GET_FILTER_BY_FROM_FILTER_LIST>[0], expected: Record<string, AppFilter[]> }>([
      {
        name: 'group filters by column name',
        input: {
          filterList: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'age', operator: '>', value: 18 }),
            new AppFilter({ column: 'name', operator: 'LIKE', value: '%Doe%' }),
          ],
        },
        expected: {
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'name', operator: 'LIKE', value: '%Doe%' }),
          ],
          age: [
            new AppFilter({ column: 'age', operator: '>', value: 18 }),
          ],
        },
      },
      {
        name: 'sanitize column names when no conceptSet provided',
        input: {
          filterList: [
            new AppFilter({ column: 'user-name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'user`name', operator: '=', value: 'Jane' }),
            new AppFilter({ column: 'user"name', operator: '=', value: 'Bob' }),
          ],
        },
        expected: {
          username: [
            new AppFilter({ column: 'user-name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'user`name', operator: '=', value: 'Jane' }),
            new AppFilter({ column: 'user"name', operator: '=', value: 'Bob' }),
          ],
        },
      },
      {
        name: 'filter by conceptSet when provided',
        input: {
          filterList: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'age', operator: '>', value: 18 }),
            new AppFilter({ column: 'email', operator: 'LIKE', value: '%@%' }),
          ],
          conceptSet: new Set(['name', 'email']),
        },
        expected: {
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          ],
          email: [
            new AppFilter({ column: 'email', operator: 'LIKE', value: '%@%' }),
          ],
        },
      },
      {
        name: 'handle empty filter list',
        input: { filterList: [] },
        expected: {},
      },
      {
        name: 'skip filters without column (AppFilter defaults column to \'\')',
        input: {
          filterList: [
            new AppFilter({ operator: '=', value: 'John' }),
            new AppFilter({ column: 'name', operator: '=', value: 'Jane' }),
          ],
        },
        expected: {
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'Jane' }),
          ],
        },
      },
      {
        name: 'skip filters whose column is empty once sanitized',
        input: {
          filterList: [
            new AppFilter({ column: '\'";--', operator: '=', value: 'x' }),
          ],
        },
        expected: {},
      },
      {
        name: 'handle array filters',
        input: {
          filterList: [
            new AppFilter({ column: 'status', operator: '=', value: 'active' }),
            new AppFilter({ column: 'status', operator: '=', value: 'inactive' }),
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          ],
        },
        expected: {
          status: [
            new AppFilter({ column: 'status', operator: '=', value: 'active' }),
            new AppFilter({ column: 'status', operator: '=', value: 'inactive' }),
          ],
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          ],
        },
      },
    ])(
      'should $name',
      ({ input, expected }) => {
        expect(GET_FILTER_BY_FROM_FILTER_LIST(input)).toEqual(expected)
      }
    )
  }
)
