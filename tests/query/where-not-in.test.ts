import { describe, expect, it } from 'bun:test'
import { WHERE_NOT_IN } from '../../ts/query/where-not-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'WHERE_NOT_IN',
  () => {
    const testCases: Array<{ name: string, column: string, values: unknown, expectedCalls: QbCall[] }> = [
      { name: 'single plain value → whereNot(col, "=", val)', column: 'id', values: [99], expectedCalls: [{ method: 'whereNot', args: ['id', '=', 99] }] },
      { name: 'single §§not0§§ → where(col, "=", 0)', column: 'status', values: ['§§not0§§'], expectedCalls: [{ method: 'where', args: ['status', '=', 0] }] },
      { name: 'single §§null§§ → whereNotNull(col)', column: 'deleted_at', values: ['§§null§§'], expectedCalls: [{ method: 'whereNotNull', args: ['deleted_at'] }] },
      { name: '2 plain values → whereNot for each', column: 'role', values: ['admin', 'editor'], expectedCalls: [{ method: 'whereNot', args: ['role', '=', 'admin'] }, { method: 'whereNot', args: ['role', '=', 'editor'] }] },
      { name: 'multi with §§not0§§ → where(col, "=", 0) for sentinel', column: 'status', values: ['§§not0§§', 'active'], expectedCalls: [{ method: 'where', args: ['status', '=', 0] }, { method: 'whereNot', args: ['status', '=', 'active'] }] },
      { name: 'multi with §§null§§ → whereNotNull for sentinel', column: 'deleted_at', values: ['§§null§§', 'x'], expectedCalls: [{ method: 'whereNotNull', args: ['deleted_at'] }, { method: 'whereNot', args: ['deleted_at', '=', 'x'] }] },
    ]

    it.each(testCases)(
      '$name',
      ({ column, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        WHERE_NOT_IN({ qb, column, values: values as any })
        expect(calls).toEqual(expectedCalls)
      }
    )
  }
)
