import { describe, expect, it } from 'bun:test'
import { WHERE } from '../../ts/query/where.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbMethod } from '../mocks/query-mocks.js'

describe(
  'WHERE',
  () => {
    const equalityCases: Array<{ name: string, params: object, expectedMethod: QbMethod, expectedArgs: unknown[] }> = [
      { name: 'plain value, no operator → where(col, "=", val)', params: { column: 'name', value: 'Alice' }, expectedMethod: 'where', expectedArgs: ['name', '=', 'Alice'] },
      { name: 'explicit operator > → where(col, ">", val)', params: { column: 'age', operator: '>', value: 18 }, expectedMethod: 'where', expectedArgs: ['age', '>', 18] },
      { name: 'null value → whereNull(col)', params: { column: 'deleted_at', value: null }, expectedMethod: 'whereNull', expectedArgs: ['deleted_at'] },
      { name: '§§null§§ value → whereNull(col)', params: { column: 'deleted_at', value: '§§null§§' }, expectedMethod: 'whereNull', expectedArgs: ['deleted_at'] },
    ]

    it.each(equalityCases)(
      '$name',
      ({ params, expectedMethod, expectedArgs }) => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe(expectedMethod)
        expect(calls[0].args).toEqual(expectedArgs)
      }
    )

    const patternCases = [
      { name: 'ilike without bPg → like with %...%', params: { column: 'name', operator: 'ilike', value: 'alice' }, expectedOperator: 'like', expectedPattern: '%alice%' },
      { name: 'ilike with bPg → ilike with %...%', params: { column: 'name', operator: 'ilike', value: 'alice', bPg: true }, expectedOperator: 'ilike', expectedPattern: '%alice%' },
      { name: 'bBeginsWith → pattern ends with %', params: { column: 'name', value: 'ali', bBeginsWith: true }, expectedOperator: 'like', expectedPattern: 'ali%' },
      { name: 'bEndsWith → pattern starts with %', params: { column: 'name', value: 'ice', bEndsWith: true }, expectedOperator: 'like', expectedPattern: '%ice' },
      { name: 'bBeginsWith + bEndsWith → pattern wrapped with %', params: { column: 'name', value: 'bob', bBeginsWith: true, bEndsWith: true }, expectedOperator: 'like', expectedPattern: '%bob%' },
    ]

    it.each(patternCases)(
      '$name',
      ({ params, expectedOperator, expectedPattern }) => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args[1]).toBe(expectedOperator)
        expect(calls[0].args[2]).toBe(expectedPattern)
      }
    )

    const rawCases = [
      { name: 'like operator, non-pg → whereRaw with INSTR', params: { column: 'name', operator: 'like', value: 'ali' }, expectedKeyword: 'INSTR' },
      { name: 'like operator with bPg → whereRaw with POSITION', params: { column: 'name', operator: 'like', value: 'ali', bPg: true }, expectedKeyword: 'POSITION' },
    ]

    it.each(rawCases)(
      '$name',
      ({ params, expectedKeyword }) => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe('whereRaw')
        expect(calls[0].args[0]).toContain(expectedKeyword)
      }
    )
  }
)
