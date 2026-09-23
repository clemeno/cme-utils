import { describe, expect, it } from 'bun:test'
import { WHERE_IN_OR_FALSE } from '../../ts/query/where-in-or-false.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE_IN_OR_FALSE',
  () => {
    it.each([
      { name: 'empty array', values: [] },
      { name: 'empty Set', values: new Set() },
      { name: 'empty Map', values: new Map() },
    ])(
      '$name → whereRaw("1 = 0")',
      ({ values }) => {
        const { qb, calls } = makeMockQb()
        WHERE_IN_OR_FALSE({ qb, column: 'id', values })
        expect(calls).toEqual([{ method: 'whereRaw', args: ['1 = 0'] }])
      }
    )

    it(
      'non-empty Set → delegates to WHERE_IN',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE_IN_OR_FALSE({ qb, column: 'id', values: new Set([42]) })
        expect(calls).toEqual([{ method: 'where', args: ['id', '=', 42] }])
      }
    )
  }
)
