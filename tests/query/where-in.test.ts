import { describe, expect, it } from 'bun:test'
import { WHERE_IN } from '../../ts/query/where-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'WHERE_IN',
  () => {
    const singleValueCases: Array<{ name: string, column: string, values: unknown, expectedCalls: QbCall[] }> = [
      { name: 'single plain value → where(col, "=", val)', column: 'id', values: [42], expectedCalls: [{ method: 'where', args: ['id', '=', 42] }] },
      { name: 'single §§not0§§ → whereNot(col, "=", 0)', column: 'status', values: ['§§not0§§'], expectedCalls: [{ method: 'whereNot', args: ['status', '=', 0] }] },
      { name: 'single §§null§§ → whereNull(col)', column: 'deleted_at', values: ['§§null§§'], expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
      { name: 'uppercase §§NOT0§§ → whereNot (case-insensitive)', column: 'status', values: ['§§NOT0§§'], expectedCalls: [{ method: 'whereNot', args: ['status', '=', 0] }] },
      { name: 'uppercase §§NULL§§ → whereNull (case-insensitive)', column: 'deleted_at', values: ['§§NULL§§'], expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
      { name: 'Set with single entry → where(col, "=", val)', column: 'id', values: new Set([7]), expectedCalls: [{ method: 'where', args: ['id', '=', 7] }] },
    ]

    it.each(singleValueCases)(
      '$name',
      ({ column, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column, values: values as any })
        expect(calls).toEqual(expectedCalls)
      }
    )

    const multiValueCases: Array<{ name: string, column: string, values: unknown, expectedInner: QbCall[] }> = [
      { name: 'empty values → empty where group, dropped by knex (filter ignored)', column: 'id', values: [], expectedInner: [] },
      { name: '2 plain values → orWhere for each inside callback', column: 'role', values: ['admin', 'editor'], expectedInner: [{ method: 'orWhere', args: ['role', '=', 'admin'] }, { method: 'orWhere', args: ['role', '=', 'editor'] }] },
      { name: 'multi with §§not0§§ → orWhereNot for sentinel', column: 'status', values: ['§§not0§§', 1], expectedInner: [{ method: 'orWhereNot', args: ['status', '=', 0] }, { method: 'orWhere', args: ['status', '=', 1] }] },
      { name: 'multi with §§null§§ → orWhereNull for sentinel', column: 'deleted_at', values: ['§§null§§', 1], expectedInner: [{ method: 'orWhereNull', args: ['deleted_at'] }, { method: 'orWhere', args: ['deleted_at', '=', 1] }] },
      { name: 'multi with uppercase sentinels → case-insensitive', column: 'col', values: ['§§NOT0§§', '§§NULL§§'], expectedInner: [{ method: 'orWhereNot', args: ['col', '=', 0] }, { method: 'orWhereNull', args: ['col'] }] },
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

    const group = expect.any(Function)
    const mixed = ['§§not0§§', '§§null§§', 1]

    const flagCases: Array<{ name: string, bOr: boolean, bNot: boolean, values: unknown[], expectedCalls: QbCall[] }> = [
      { name: 'no flag, like WHERE_IN: single §§null§§ → whereNull', bOr: false, bNot: false, values: ['§§null§§'], expectedCalls: [{ method: 'whereNull', args: ['col'] }] },
      { name: 'no flag, like WHERE_IN: mixed → where group of orWhereNot(0), orWhereNull, orWhere', bOr: false, bNot: false, values: mixed, expectedCalls: [{ method: 'where', args: [group] }, { method: 'orWhereNot', args: ['col', '=', 0] }, { method: 'orWhereNull', args: ['col'] }, { method: 'orWhere', args: ['col', '=', 1] }] },
      { name: 'no flag, like WHERE_IN: empty → empty where group', bOr: false, bNot: false, values: [], expectedCalls: [{ method: 'where', args: [group] }] },
      { name: 'bOr, like OR_WHERE_IN: single §§null§§ → orWhereNull', bOr: true, bNot: false, values: ['§§null§§'], expectedCalls: [{ method: 'orWhereNull', args: ['col'] }] },
      { name: 'bOr, like OR_WHERE_IN: mixed → orWhereNot(0), orWhereNull, orWhere, no group', bOr: true, bNot: false, values: mixed, expectedCalls: [{ method: 'orWhereNot', args: ['col', '=', 0] }, { method: 'orWhereNull', args: ['col'] }, { method: 'orWhere', args: ['col', '=', 1] }] },
      { name: 'bOr, like OR_WHERE_IN: empty → no calls', bOr: true, bNot: false, values: [], expectedCalls: [] },
      { name: 'bNot, like WHERE_NOT_IN: single §§null§§ → whereNotNull', bOr: false, bNot: true, values: ['§§null§§'], expectedCalls: [{ method: 'whereNotNull', args: ['col'] }] },
      { name: 'bNot, like WHERE_NOT_IN: mixed → where(0), whereNotNull, whereNot, no group', bOr: false, bNot: true, values: mixed, expectedCalls: [{ method: 'where', args: ['col', '=', 0] }, { method: 'whereNotNull', args: ['col'] }, { method: 'whereNot', args: ['col', '=', 1] }] },
      { name: 'bNot, like WHERE_NOT_IN: empty → no calls', bOr: false, bNot: true, values: [], expectedCalls: [] },
      { name: 'bOr and bNot, like OR_WHERE_NOT_IN: single §§null§§ → orWhereNotNull', bOr: true, bNot: true, values: ['§§null§§'], expectedCalls: [{ method: 'orWhereNotNull', args: ['col'] }] },
      { name: 'bOr and bNot, like OR_WHERE_NOT_IN: mixed → orWhere group of where(0), whereNotNull, whereNot', bOr: true, bNot: true, values: mixed, expectedCalls: [{ method: 'orWhere', args: [group] }, { method: 'where', args: ['col', '=', 0] }, { method: 'whereNotNull', args: ['col'] }, { method: 'whereNot', args: ['col', '=', 1] }] },
      { name: 'bOr and bNot, like OR_WHERE_NOT_IN: empty → empty orWhere group', bOr: true, bNot: true, values: [], expectedCalls: [{ method: 'orWhere', args: [group] }] },
    ]

    it.each(flagCases)(
      '$name',
      ({ bOr, bNot, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        WHERE_IN({ qb, column: 'col', values, bOr, bNot })
        expect(calls).toEqual(expectedCalls)
      }
    )
  }
)
