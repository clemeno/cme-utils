import { describe, expect, it } from 'bun:test'
import { AppFilter } from '../ts/app-filter.js'
import { AppOrFilter } from '../ts/app-or-filter.js'

describe(
  'AppOrFilter',
  () => {
    it.each<{ name: string, input: Partial<AppOrFilter>, expected: AppFilter[] }>([
      {
        name: 'assigns empty or array',
        input: { or: [] },
        expected: [],
      },
      {
        name: 'assigns or array of AppFilter instances',
        input: { or: [new AppFilter({ column: 'city', operator: '=', value: 'Paris' }), new AppFilter({ column: 'city', operator: '=', value: 'Lyon' })] },
        expected: [new AppFilter({ column: 'city', operator: '=', value: 'Paris' }), new AppFilter({ column: 'city', operator: '=', value: 'Lyon' })],
      },
      {
        name: 'default or is empty array when not provided',
        input: {},
        expected: [],
      },
    ])(
      '$name',
      ({ input, expected }) => {
        const orf = new AppOrFilter(input)
        expect(orf.or).toStrictEqual(expected)
      }
    )
  }
)
