import { describe, expect, it } from 'bun:test'
import { OR_WHERE } from '../../ts/query/or-where.util.js'
import { makeMockQb } from '../mocks/query-mocks.js'

describe(
  'OR_WHERE',
  () => {
    it(
      'simple equality: no operator → qb.orWhere(col, "=", val)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'city', value: 'Paris' })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args).toEqual(['city', '=', 'Paris'])
      }
    )

    it(
      'explicit operator → qb.orWhere(col, op, val)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'age', operator: '<', value: 30 })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args).toEqual(['age', '<', 30])
      }
    )

    it(
      'ilike without pg → uses "like"',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', operator: 'ilike', value: 'bob' })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args[1]).toBe('like')
        expect(calls[0].args[2]).toBe('%bob%')
      }
    )

    it(
      'bBeginsWith → pattern ends with %',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', value: 'bob', bBeginsWith: true })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args[2]).toBe('bob%')
      }
    )

    it(
      'like operator → qb.orWhereRaw INSTR (non-pg)',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', operator: 'like', value: 'bob' })
        expect(calls[0].method).toBe('orWhereRaw')
        expect(calls[0].args[0]).toContain('INSTR')
      }
    )

    it(
      'like operator + bPg → qb.orWhereRaw POSITION',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', operator: 'like', value: 'bob', bPg: true })
        expect(calls[0].method).toBe('orWhereRaw')
        expect(calls[0].args[0]).toContain('POSITION')
      }
    )

    it(
      'ilike + bPg → uses "ilike"',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', operator: 'ilike', value: 'bob', bPg: true })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args[1]).toBe('ilike')
      }
    )

    it(
      'bEndsWith → pattern starts with %',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', value: 'bob', bEndsWith: true })
        expect(calls[0].method).toBe('orWhere')
        expect(calls[0].args[2]).toBe('%bob')
      }
    )

    it(
      'bBeginsWith + bEndsWith → pattern wrapped with %',
      () => {
        const { qb, calls } = makeMockQb()
        OR_WHERE({ qb, column: 'name', value: 'bob', bBeginsWith: true, bEndsWith: true })
        expect(calls[0].method).toBe('orWhere')
        // bBeginsWith first: 'bob%', then bEndsWith: '%bob%'
        expect(calls[0].args[2]).toBe('%bob%')
      }
    )
  }
)
