import { describe, expect, it } from 'bun:test'
import { AppFilter } from '../ts/app-filter.js'

describe(
  'AppFilter',
  () => {
    it.each<{ name: string, input: Partial<AppFilter>, expected: AppFilter }>([
      { name: 'assigns column and operator', input: { column: 'name', operator: '=' }, expected: { column: 'name', operator: '=' } },
      { name: 'assigns value', input: { column: 'age', operator: '>', value: 18 }, expected: { column: 'age', operator: '>', value: 18 } },
      { name: 'assigns options with bDbSideToHex', input: { column: 'csn', operator: '=', value: '123', options: { bDbSideToHex: 1 } }, expected: { column: 'csn', operator: '=', value: '123', options: { bDbSideToHex: 1 } } },
      { name: 'default column and operator are empty strings', input: { column: '' }, expected: { column: '', operator: '' } },
      { name: 'value is undefined when not provided', input: { column: 'id', operator: '=' }, expected: { column: 'id', operator: '=', value: undefined } },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(new AppFilter(input)).toEqual(expected)
      }
    )
  }
)
