import { describe, expect, it } from 'bun:test'
import { GET_FILTER_BY_FROM_FILTER_LIST } from '../../ts/filter/get-filter-by-from-filter-list.util.js'
import { AppFilter } from '../../ts/app-filter.js'

describe(
  'GET_FILTER_BY_FROM_FILTER_LIST',
  () => {
    it(
      'should group filters by column name',
      () => {
        const filters = [
          new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          new AppFilter({ column: 'age', operator: '>', value: 18 }),
          new AppFilter({ column: 'name', operator: 'LIKE', value: '%Doe%' }),
        ]

        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: filters,
        })

        expect(result).toEqual({
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'name', operator: 'LIKE', value: '%Doe%' }),
          ],
          age: [
            new AppFilter({ column: 'age', operator: '>', value: 18 }),
          ],
        })
      }
    )

    it(
      'should sanitize column names when no conceptSet provided',
      () => {
        const filters = [
          new AppFilter({ column: 'user-name', operator: '=', value: 'John' }),
          new AppFilter({ column: 'user`name', operator: '=', value: 'Jane' }),
          new AppFilter({ column: 'user"name', operator: '=', value: 'Bob' }),
        ]

        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: filters,
        })

        expect(result).toEqual({
          username: [
            new AppFilter({ column: 'user-name', operator: '=', value: 'John' }),
            new AppFilter({ column: 'user`name', operator: '=', value: 'Jane' }),
            new AppFilter({ column: 'user"name', operator: '=', value: 'Bob' }),
          ],
        })
      }
    )

    it(
      'should filter by conceptSet when provided',
      () => {
        const filters = [
          new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          new AppFilter({ column: 'age', operator: '>', value: 18 }),
          new AppFilter({ column: 'email', operator: 'LIKE', value: '%@%' }),
        ]

        const conceptSet = new Set(['name', 'email'])

        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: filters,
          conceptSet,
        })

        expect(result).toEqual({
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'John' }),
          ],
          email: [
            new AppFilter({ column: 'email', operator: 'LIKE', value: '%@%' }),
          ],
        })
      }
    )

    it(
      'should handle empty filter list',
      () => {
        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: [],
        })

        expect(result).toEqual({})
      }
    )

    it(
      'should skip filters without column',
      () => {
        const filters = [
          new AppFilter({ operator: '=', value: 'John' }), // No column
          new AppFilter({ column: 'name', operator: '=', value: 'Jane' }),
        ]

        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: filters,
        })

        expect(result).toEqual({
          '': [
            new AppFilter({ operator: '=', value: 'John' }),
          ],
          name: [
            new AppFilter({ column: 'name', operator: '=', value: 'Jane' }),
          ],
        })
      }
    )

    it(
      'should handle array filters',
      () => {
        const filterArray = [
          new AppFilter({ column: 'status', operator: '=', value: 'active' }),
          new AppFilter({ column: 'status', operator: '=', value: 'inactive' }),
        ]

        const filters = [
          ...filterArray,
          new AppFilter({ column: 'name', operator: '=', value: 'John' }),
        ]

        const result = GET_FILTER_BY_FROM_FILTER_LIST({
          filterList: filters,
        })

        expect(result.name).toEqual([
          new AppFilter({ column: 'name', operator: '=', value: 'John' }),
        ])
        expect(result.status).toEqual(filterArray)
      }
    )
  }
)
