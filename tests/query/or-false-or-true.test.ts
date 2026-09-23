import { describe, expect, it } from 'bun:test'
import { OR_WHERE_IN_OR_FALSE } from '../../ts/query/or-where-in-or-false.util.js'
import { OR_WHERE_NOT_IN_OR_TRUE } from '../../ts/query/or-where-not-in-or-true.util.js'
import { WHERE_IN_OR_FALSE } from '../../ts/query/where-in-or-false.util.js'
import { WHERE_NOT_IN_OR_TRUE } from '../../ts/query/where-not-in-or-true.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbMethod } from '../mocks/query-mocks.js'

// empty-input SQL mirrors knex: whereIn([]) → 1 = 0, whereNotIn([]) → 1 = 1, same with the or* variants
const utilCases: Array<{ name: string, util: (inParams: any) => void, rawMethod: QbMethod, rawSql: string, delegateMethod: QbMethod }> = [
  { name: 'WHERE_IN_OR_FALSE', util: WHERE_IN_OR_FALSE, rawMethod: 'whereRaw', rawSql: '1 = 0', delegateMethod: 'where' },
  { name: 'OR_WHERE_IN_OR_FALSE', util: OR_WHERE_IN_OR_FALSE, rawMethod: 'orWhereRaw', rawSql: '1 = 0', delegateMethod: 'orWhere' },
  { name: 'WHERE_NOT_IN_OR_TRUE', util: WHERE_NOT_IN_OR_TRUE, rawMethod: 'whereRaw', rawSql: '1 = 1', delegateMethod: 'whereNot' },
  { name: 'OR_WHERE_NOT_IN_OR_TRUE', util: OR_WHERE_NOT_IN_OR_TRUE, rawMethod: 'orWhereRaw', rawSql: '1 = 1', delegateMethod: 'orWhereNot' },
]

describe.each(utilCases)(
  '$name',
  ({ util, rawMethod, rawSql, delegateMethod }) => {
    it.each([
      { name: 'empty array', values: [] },
      { name: 'empty Set', values: new Set() },
      { name: 'empty Map', values: new Map() },
    ])(
      `$name → ${rawMethod}("${rawSql}")`,
      ({ values }) => {
        const { qb, calls } = makeMockQb()
        util({ qb, column: 'id', values })
        expect(calls).toEqual([{ method: rawMethod, args: [rawSql] }])
      }
    )

    it(
      `non-empty Set → delegates (${delegateMethod})`,
      () => {
        const { qb, calls } = makeMockQb()
        util({ qb, column: 'id', values: new Set([42]) })
        expect(calls).toEqual([{ method: delegateMethod, args: ['id', '=', 42] }])
      }
    )
  }
)
