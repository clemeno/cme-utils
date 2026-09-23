import { describe, expect, it } from 'bun:test'
import { OR_WHERE } from '../../ts/query/or-where.util.js'
import type { WhereParams } from '../../ts/where-params.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE',
  () => {
    const rawColumn = { sql: 'LOWER(name)' }

    const testCases: Array<{ name: string, params: Omit<WhereParams, 'qb'>, expectedCalls: QbCall[] }> = [
      { name: 'plain value, no operator → orWhere(col, "=", val)', params: { column: 'city', value: 'Paris' }, expectedCalls: [{ method: 'orWhere', args: ['city', '=', 'Paris'] }] },
      { name: 'explicit operator < → orWhere(col, "<", val)', params: { column: 'age', operator: '<', value: 30 }, expectedCalls: [{ method: 'orWhere', args: ['age', '<', 30] }] },
      { name: 'null value → orWhereNull(col)', params: { column: 'deleted_at', value: null }, expectedCalls: [{ method: 'orWhereNull', args: ['deleted_at'] }] },
      { name: '§§null§§ value → orWhereNull(col)', params: { column: 'deleted_at', value: '§§null§§' }, expectedCalls: [{ method: 'orWhereNull', args: ['deleted_at'] }] },
      { name: 'uppercase §§NULL§§ → orWhereNull (case-insensitive)', params: { column: 'deleted_at', value: '§§NULL§§' }, expectedCalls: [{ method: 'orWhereNull', args: ['deleted_at'] }] },
      { name: 'ilike without bPg → like with %...%', params: { column: 'name', operator: 'ilike', value: 'bob' }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', '%bob%'] }] },
      { name: 'ilike with bPg → ilike with %...%', params: { column: 'name', operator: 'ilike', value: 'bob', bPg: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'ilike', '%bob%'] }] },
      { name: 'bBeginsWith → pattern ends with %', params: { column: 'name', value: 'bob', bBeginsWith: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', 'bob%'] }] },
      { name: 'bEndsWith → pattern starts with %', params: { column: 'name', value: 'bob', bEndsWith: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', '%bob'] }] },
      { name: 'bBeginsWith + bEndsWith → pattern wrapped with %', params: { column: 'name', value: 'bob', bBeginsWith: true, bEndsWith: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', '%bob%'] }] },
      { name: 'bBeginsWith with bPg → ilike', params: { column: 'name', value: 'bob', bBeginsWith: true, bPg: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'ilike', 'bob%'] }] },
      { name: 'without bKeepPercentAndDash → % and _ stay wildcards', params: { column: 'name', value: '50%_off', bBeginsWith: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', '50%_off%'] }] },
      { name: 'bKeepPercentAndDash → % and _ escaped as literals', params: { column: 'name', value: '50%_off', bBeginsWith: true, bKeepPercentAndDash: true }, expectedCalls: [{ method: 'orWhere', args: ['name', 'like', '50\\%\\_off%'] }] },
      { name: 'like, non-pg → orWhereRaw INSTR on snake_case column, value bound', params: { column: 'u.firstName', operator: 'like', value: 'bob' }, expectedCalls: [{ method: 'orWhereRaw', args: ['INSTR(u.first_name, ?) > 0', ['bob']] }] },
      { name: 'like with bPg → orWhereRaw POSITION on snake_case column, value bound', params: { column: 'u.firstName', operator: 'like', value: 'bob', bPg: true }, expectedCalls: [{ method: 'orWhereRaw', args: ['POSITION(? IN u.first_name) > 0', ['bob']] }] },
      { name: 'like strips SQL out of the raw column name', params: { column: 'name) > 0 OR 1=1 --', operator: 'like', value: 'x' }, expectedCalls: [{ method: 'orWhereRaw', args: ['INSTR(name0_o_r11, ?) > 0', ['x']] }] },
      { name: 'like with non-string column → orWhere(col, "like", val)', params: { column: rawColumn, operator: 'like', value: 'bob' }, expectedCalls: [{ method: 'orWhere', args: [rawColumn, 'like', 'bob'] }] },
    ]

    it.each(testCases)(
      '$name',
      ({ params, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, ...params })
        expect(calls).toEqual(expectedCalls)
      }
    )
  }
)
