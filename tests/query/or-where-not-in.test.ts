import { describe, expect, it } from 'bun:test'
import { OR_WHERE_NOT_IN } from '../../ts/query/or-where-not-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_NOT_IN',
  () => {
    const singleValueCases: Array<{ name: string, column: string, values: unknown, expectedCalls: QbCall[] }> = [
      { name: 'single plain value → direct orWhereNot(col, "=", val)', column: 'role', values: ['foo'], expectedCalls: [{ method: 'orWhereNot', args: ['role', '=', 'foo'] }] },
      { name: 'single §§not0§§ → direct orWhere(col, "=", 0)', column: 'status', values: ['§§not0§§'], expectedCalls: [{ method: 'orWhere', args: ['status', '=', 0] }] },
      { name: 'single §§null§§ → direct orWhereNotNull(col)', column: 'deleted_at', values: ['§§null§§'], expectedCalls: [{ method: 'orWhereNotNull', args: ['deleted_at'] }] },
      { name: 'uppercase §§NOT0§§ → orWhere(col, "=", 0) (case-insensitive)', column: 'status', values: ['§§NOT0§§'], expectedCalls: [{ method: 'orWhere', args: ['status', '=', 0] }] },
      { name: 'uppercase §§NULL§§ → orWhereNotNull (case-insensitive)', column: 'deleted_at', values: ['§§NULL§§'], expectedCalls: [{ method: 'orWhereNotNull', args: ['deleted_at'] }] },
      { name: 'Map with single entry → IS_A_MAP branch, direct orWhereNot', column: 'n', values: new Map([['k', 'v1']]), expectedCalls: [{ method: 'orWhereNot', args: ['n', '=', 'v1'] }] },
    ]

    it.each(singleValueCases)(
      '$name',
      ({ column, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column, values: values as any })
        expect(calls).toEqual(expectedCalls)
      }
    )

    const multiValueCases: Array<{ name: string, column: string, values: unknown, expectedInner: QbCall[] }> = [
      { name: '2 plain values → orWhere callback + 2 inner whereNot', column: 'role', values: ['admin', 'editor'], expectedInner: [{ method: 'whereNot', args: ['role', '=', 'admin'] }, { method: 'whereNot', args: ['role', '=', 'editor'] }] },
      { name: '3 plain values → orWhere callback + 3 inner whereNot', column: 'col', values: ['a', 'b', 'c'], expectedInner: [{ method: 'whereNot', args: ['col', '=', 'a'] }, { method: 'whereNot', args: ['col', '=', 'b'] }, { method: 'whereNot', args: ['col', '=', 'c'] }] },
      { name: 'empty values → orWhere callback, no inner calls', column: 'col', values: [], expectedInner: [] },
      { name: 'Set input → orWhere callback + whereNot per entry', column: 'tag', values: new Set(['p', 'q']), expectedInner: [{ method: 'whereNot', args: ['tag', '=', 'p'] }, { method: 'whereNot', args: ['tag', '=', 'q'] }] },
      { name: 'mixed sentinels + plain → where(0), whereNull, whereNot inside callback', column: 'col', values: ['§§not0§§', '§§null§§', 'active'], expectedInner: [{ method: 'where', args: ['col', '=', 0] }, { method: 'whereNull', args: ['col'] }, { method: 'whereNot', args: ['col', '=', 'active'] }] },
    ]

    it.each(multiValueCases)(
      '$name',
      ({ column, values, expectedInner }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_NOT_IN({ qb, column, values: values as any })
        expect(calls[0].method).toBe('orWhere')
        expect(typeof calls[0].args[0]).toBe('function')
        expect(calls.slice(1)).toEqual(expectedInner)
      }
    )
  }
)
