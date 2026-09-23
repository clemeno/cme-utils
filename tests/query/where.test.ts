import { describe, expect, it } from 'bun:test'
import { WHERE } from '../../ts/query/where.util.js'
import type { WhereParams } from '../../ts/where-params.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbCall } from '../mocks/query-mocks.js'

describe(
  'WHERE',
  () => {
    const rawColumn = { sql: 'LOWER(name)' }

    const testCases: Array<{ name: string, params: Omit<WhereParams, 'qb'>, expectedCalls: QbCall[] }> = [
      { name: 'plain value, no operator → where(col, "=", val)', params: { column: 'name', value: 'Alice' }, expectedCalls: [{ method: 'where', args: ['name', '=', 'Alice'] }] },
      { name: 'explicit operator > → where(col, ">", val)', params: { column: 'age', operator: '>', value: 18 }, expectedCalls: [{ method: 'where', args: ['age', '>', 18] }] },
      { name: 'null value → whereNull(col)', params: { column: 'deleted_at', value: null }, expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
      { name: '§§null§§ value → whereNull(col)', params: { column: 'deleted_at', value: '§§null§§' }, expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
      { name: 'uppercase §§NULL§§ → whereNull (case-insensitive)', params: { column: 'deleted_at', value: '§§NULL§§' }, expectedCalls: [{ method: 'whereNull', args: ['deleted_at'] }] },
      { name: 'ilike without bPg → like with %...%', params: { column: 'name', operator: 'ilike', value: 'alice' }, expectedCalls: [{ method: 'where', args: ['name', 'like', '%alice%'] }] },
      { name: 'ilike with bPg → ilike with %...%', params: { column: 'name', operator: 'ilike', value: 'alice', bPg: true }, expectedCalls: [{ method: 'where', args: ['name', 'ilike', '%alice%'] }] },
      { name: 'bBeginsWith → pattern ends with %', params: { column: 'name', value: 'ali', bBeginsWith: true }, expectedCalls: [{ method: 'where', args: ['name', 'like', 'ali%'] }] },
      { name: 'bEndsWith → pattern starts with %', params: { column: 'name', value: 'ice', bEndsWith: true }, expectedCalls: [{ method: 'where', args: ['name', 'like', '%ice'] }] },
      { name: 'bBeginsWith + bEndsWith → pattern wrapped with %', params: { column: 'name', value: 'bob', bBeginsWith: true, bEndsWith: true }, expectedCalls: [{ method: 'where', args: ['name', 'like', '%bob%'] }] },
      { name: 'bBeginsWith with bPg → ilike', params: { column: 'name', value: 'ali', bBeginsWith: true, bPg: true }, expectedCalls: [{ method: 'where', args: ['name', 'ilike', 'ali%'] }] },
      { name: 'without bKeepPercentAndDash → % and _ stay wildcards', params: { column: 'name', value: '50%_off', bBeginsWith: true }, expectedCalls: [{ method: 'where', args: ['name', 'like', '50%_off%'] }] },
      { name: 'bKeepPercentAndDash → % and _ escaped as literals', params: { column: 'name', value: '50%_off', bBeginsWith: true, bKeepPercentAndDash: true }, expectedCalls: [{ method: 'where', args: ['name', 'like', '50\\%\\_off%'] }] },
      { name: 'like, non-pg → whereRaw INSTR on snake_case column, value bound', params: { column: 'u.firstName', operator: 'like', value: 'ali' }, expectedCalls: [{ method: 'whereRaw', args: ['INSTR(u.first_name, ?) > 0', ['ali']] }] },
      { name: 'like with bPg → whereRaw POSITION on snake_case column, value bound', params: { column: 'u.firstName', operator: 'like', value: 'ali', bPg: true }, expectedCalls: [{ method: 'whereRaw', args: ['POSITION(? IN u.first_name) > 0', ['ali']] }] },
      { name: 'like strips SQL out of the raw column name', params: { column: 'name) > 0 OR 1=1 --', operator: 'like', value: 'x' }, expectedCalls: [{ method: 'whereRaw', args: ['INSTR(name0_o_r11, ?) > 0', ['x']] }] },
      { name: 'like with non-string column → where(col, "like", val)', params: { column: rawColumn, operator: 'like', value: 'ali' }, expectedCalls: [{ method: 'where', args: [rawColumn, 'like', 'ali'] }] },
    ]

    it.each(testCases)(
      '$name',
      ({ params, expectedCalls }) => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, ...params })
        expect(calls).toEqual(expectedCalls)
      }
    )
  }
)
