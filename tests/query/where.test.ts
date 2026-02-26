import { describe, expect, it } from 'bun:test'
import { WHERE } from '../../ts/query/where.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'WHERE',
  () => {
    it(
      'simple equality: no operator, plain value → qb.where(col, "=", val)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', value: 'Alice' })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args).toEqual(['name', '=', 'Alice'])
      }
    )

    it(
      'null value → qb.whereNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'deleted_at', value: null })
        expect(calls[0].method).toBe('whereNull')
        expect(calls[0].args[0]).toBe('deleted_at')
      }
    )

    it(
      '§§null§§ value → qb.whereNull(col)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'deleted_at', value: '§§null§§' })
        expect(calls[0].method).toBe('whereNull')
      }
    )

    it(
      'explicit operator (>) → qb.where(col, op, val)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'age', operator: '>', value: 18 })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args).toEqual(['age', '>', 18])
      }
    )

    it(
      'ilike operator without pg → uses "like"',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', operator: 'ilike', value: 'alice' })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args[1]).toBe('like')
        expect(calls[0].args[2]).toBe('%alice%')
      }
    )

    it(
      'ilike operator with bPg → uses "ilike"',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', operator: 'ilike', value: 'alice', bPg: true })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args[1]).toBe('ilike')
        expect(calls[0].args[2]).toBe('%alice%')
      }
    )

    it(
      'bBeginsWith → pattern ends with %',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', value: 'ali', bBeginsWith: true })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args[2]).toBe('ali%')
      }
    )

    it(
      'bEndsWith → pattern starts with %',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', value: 'ice', bEndsWith: true })
        expect(calls[0].method).toBe('where')
        expect(calls[0].args[2]).toBe('%ice')
      }
    )

    it(
      'like operator with column → qb.whereRaw INSTR (non-pg)',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', operator: 'like', value: 'ali' })
        expect(calls[0].method).toBe('whereRaw')
        expect(calls[0].args[0]).toContain('INSTR')
      }
    )

    it(
      'like operator with bPg → qb.whereRaw POSITION',
      () => {
        const { qb, calls } = makeMockQb()
        WHERE({ qb, column: 'name', operator: 'like', value: 'ali', bPg: true })
        expect(calls[0].method).toBe('whereRaw')
        expect(calls[0].args[0]).toContain('POSITION')
      }
    )
  }
)
