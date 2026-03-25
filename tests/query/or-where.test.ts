import { describe, expect, it } from 'bun:test'
import { OR_WHERE } from '../../ts/query/or-where.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'
import type { QbMethod } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE',
  () => {
    const equalityCases: Array<{ name: string, params: object, expectedMethod: QbMethod, expectedArgs: unknown[] }> = [
      { name: 'plain value, no operator → orWhere(col, "=", val)', params: { column: 'city', value: 'Paris' }, expectedMethod: 'orWhere', expectedArgs: ['city', '=', 'Paris'] },
      { name: 'explicit operator < → orWhere(col, "<", val)', params: { column: 'age', operator: '<', value: 30 }, expectedMethod: 'orWhere', expectedArgs: ['age', '<', 30] },
      { name: 'null value → orWhereNull(col)', params: { column: 'deleted_at', value: null }, expectedMethod: 'orWhereNull', expectedArgs: ['deleted_at'] },
      { name: '§§null§§ value → orWhereNull(col)', params: { column: 'deleted_at', value: '§§null§§' }, expectedMethod: 'orWhereNull', expectedArgs: ['deleted_at'] },
    ]

    it.each(equalityCases)(
      '$name',
      ({ params, expectedMethod, expectedArgs }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe(expectedMethod)
        expect(calls[0].args).toEqual(expectedArgs)
      }
    )

    const patternCases = [
      { name: 'ilike without bPg → like with %...%', params: { column: 'name', operator: 'ilike', value: 'bob' }, expectedOperator: 'like', expectedPattern: '%bob%' },
      { name: 'ilike with bPg → ilike with %...%', params: { column: 'name', operator: 'ilike', value: 'bob', bPg: true }, expectedOperator: 'ilike', expectedPattern: '%bob%' },
      { name: 'bBeginsWith → pattern ends with %', params: { column: 'name', value: 'bob', bBeginsWith: true }, expectedOperator: 'like', expectedPattern: 'bob%' },
      { name: 'bEndsWith → pattern starts with %', params: { column: 'name', value: 'bob', bEndsWith: true }, expectedOperator: 'like', expectedPattern: '%bob' },
      { name: 'bBeginsWith + bEndsWith → pattern wrapped with %', params: { column: 'name', value: 'bob', bBeginsWith: true, bEndsWith: true }, expectedOperator: 'like', expectedPattern: '%bob%' },
    ]

    it.each(patternCases)(
      '$name',
      ({ params, expectedOperator, expectedPattern }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args[1]).toBe(expectedOperator)
        expect(calls[0].args[2]).toBe(expectedPattern)
      }
    )

    const rawCases = [
      { name: 'like operator, non-pg → orWhereRaw with INSTR', params: { column: 'name', operator: 'like', value: 'bob' }, expectedKeyword: 'INSTR' },
      { name: 'like operator with bPg → orWhereRaw with POSITION', params: { column: 'name', operator: 'like', value: 'bob', bPg: true }, expectedKeyword: 'POSITION' },
    ]

    it.each(rawCases)(
      '$name',
      ({ params, expectedKeyword }) => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, ...(params as any) })
        expect(calls[0].method).toBe('orWhereRaw')
        expect(calls[0].args[0]).toContain(expectedKeyword)
      }
    )
  }
)
