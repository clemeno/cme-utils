import { describe, expect, it } from 'bun:test'
import { OR_WHERE_IN_OR_FALSE } from '../../ts/query/or-where-in-or-false.util.js'
import { WHERE_IN_OR_FALSE } from '../../ts/query/where-in-or-false.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbMethod } from '../mocks/query-mocks.js'

const utilCases: Array<{ name: string, util: (inParams: any) => void, rawMethod: QbMethod, delegateMethod: QbMethod }> = [
  { name: 'WHERE_IN_OR_FALSE', util: WHERE_IN_OR_FALSE, rawMethod: 'whereRaw', delegateMethod: 'where' },
  { name: 'OR_WHERE_IN_OR_FALSE', util: OR_WHERE_IN_OR_FALSE, rawMethod: 'orWhereRaw', delegateMethod: 'orWhere' },
]

describe.each(utilCases)(
  '$name',
  ({ util, rawMethod, delegateMethod }) => {
    it.each([
      { name: 'empty array', values: [] },
      { name: 'empty Set', values: new Set() },
      { name: 'empty Map', values: new Map() },
    ])(
      `$name → ${rawMethod}("1 = 0")`,
      ({ values }) => {
        const { qb, calls } = makeMockQb()
        util({ qb, column: 'id', values })
        expect(calls).toEqual([{ method: rawMethod, args: ['1 = 0'] }])
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
