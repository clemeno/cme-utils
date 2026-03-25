import { describe, expect, it } from 'bun:test'
import { WHERE_IN } from '../../ts/query/where-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'WHERE_IN',
  () => {
    const singleValueCases: Array<{ name: string, column: string, values: unknown[], expectedCalls: QbCall[] }> = [
      { name: 'single plain value → where(col, "=", val)', column: 'id', values: [42], expectedCalls: [{ method: 'where', args: ['id', '=', 42] }] },
      { name: 'single §§not0§§ → whereNot(col, "=", 0)', column: 'status', values: ['§§not0§§'], expectedCalls: [{ method: 'whereNot', args: ['status', '=', 0] }] },
      { name: 'single §§null§§ → whereNull(col)', column: 'deleted_at', values: ['§§null§§'], expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
    ]

    it.each(singleValueCases)(
      '$name',
      ({ column, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column, values })
        expect(calls).toEqual(expectedCalls)
      }
    )

    const multiValueCases: Array<{ name: string, column: string, values: unknown, expectedInner: QbCall[] }> = [
      { name: '2 plain values → orWhere for each inside callback', column: 'role', values: ['admin', 'editor'], expectedInner: [{ method: 'orWhere', args: ['role', '=', 'admin'] }, { method: 'orWhere', args: ['role', '=', 'editor'] }] },
      { name: 'multi with §§not0§§ → orWhereNot for sentinel', column: 'status', values: ['§§not0§§', 1], expectedInner: [{ method: 'orWhereNot', args: ['status', '=', 0] }, { method: 'orWhere', args: ['status', '=', 1] }] },
      { name: 'multi with §§null§§ → orWhereNull for sentinel', column: 'deleted_at', values: ['§§null§§', 1], expectedInner: [{ method: 'orWhereNull', args: ['deleted_at'] }, { method: 'orWhere', args: ['deleted_at', '=', 1] }] },
      { name: 'Map values → iterates Map.values() inside callback', column: 'n', values: new Map([['a', 1], ['b', 2]]), expectedInner: [{ method: 'orWhere', args: ['n', '=', 1] }, { method: 'orWhere', args: ['n', '=', 2] }] },
    ]

    it.each(multiValueCases)(
      '$name',
      ({ column, values, expectedInner }) => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column, values: values as any })
        expect(calls[0].method).toBe('where')
        expect(typeof calls[0].args[0]).toBe('function')
        expect(calls.slice(1)).toEqual(expectedInner)
      }
    )
  }
)
