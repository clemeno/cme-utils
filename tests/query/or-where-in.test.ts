import { describe, expect, it } from 'bun:test'
import { OR_WHERE_IN } from '../../ts/query/or-where-in.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE_IN',
  () => {
    const testCases: Array<{ name: string, column: string, values: unknown, expectedCalls: QbCall[] }> = [
      { name: 'single plain value → one orWhere call', column: 'id', values: [7], expectedCalls: [{ method: 'orWhere', args: ['id', '=', 7] }] },
      { name: 'single §§not0§§ → orWhereNot(col, "=", 0)', column: 'status', values: ['§§not0§§'], expectedCalls: [{ method: 'orWhereNot', args: ['status', '=', 0] }] },
      { name: 'single §§null§§ → orWhereNull(col)', column: 'deleted_at', values: ['§§null§§'], expectedCalls: [{ method: 'orWhereNull', args: ['deleted_at'] }] },
      { name: 'uppercase §§NOT0§§ → orWhereNot (case-insensitive)', column: 'status', values: ['§§NOT0§§'], expectedCalls: [{ method: 'orWhereNot', args: ['status', '=', 0] }] },
      { name: 'uppercase §§NULL§§ → orWhereNull (case-insensitive)', column: 'deleted_at', values: ['§§NULL§§'], expectedCalls: [{ method: 'orWhereNull', args: ['deleted_at'] }] },
      { name: 'empty values array → no calls', column: 'col', values: [], expectedCalls: [] },
      { name: '2 plain values → 2 orWhere calls', column: 'role', values: ['admin', 'editor'], expectedCalls: [{ method: 'orWhere', args: ['role', '=', 'admin'] }, { method: 'orWhere', args: ['role', '=', 'editor'] }] },
      { name: '3 plain values → 3 orWhere calls', column: 'col', values: ['a', 'b', 'c'], expectedCalls: [{ method: 'orWhere', args: ['col', '=', 'a'] }, { method: 'orWhere', args: ['col', '=', 'b'] }, { method: 'orWhere', args: ['col', '=', 'c'] }] },
      { name: 'mixed sentinel and plain values', column: 'col', values: ['§§not0§§', '§§null§§', 1], expectedCalls: [{ method: 'orWhereNot', args: ['col', '=', 0] }, { method: 'orWhereNull', args: ['col'] }, { method: 'orWhere', args: ['col', '=', 1] }] },
      { name: 'Map input → iterates Map.values(), not keys', column: 'n', values: new Map([['k1', 'a'], ['k2', 'b']]), expectedCalls: [{ method: 'orWhere', args: ['n', '=', 'a'] }, { method: 'orWhere', args: ['n', '=', 'b'] }] },
      { name: 'Set input → one orWhere per entry', column: 'tag', values: new Set(['x', 'y']), expectedCalls: [{ method: 'orWhere', args: ['tag', '=', 'x'] }, { method: 'orWhere', args: ['tag', '=', 'y'] }] },
    ]

    it.each(testCases)(
      '$name',
      ({ column, values, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE_IN({ qb, column, values: values as any })
        expect(calls).toEqual(expectedCalls)
      }
    )
  }
)
