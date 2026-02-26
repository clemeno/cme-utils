import { describe, expect, it } from 'bun:test'
import type { WhereParams } from '../ts/where-params.js'

describe(
  'WhereParams',
  () => {
    it(
      'creates a minimal WhereParams object',
      () => {
        const params: WhereParams = {
          qb: {},
          column: 'name',
          value: 'Alice',
        }
        expect(params.column).toBe('name')
        expect(params.value).toBe('Alice')
      }
    )

    it(
      'creates a full WhereParams object with all optional fields',
      () => {
        const params: WhereParams = {
          qb: {},
          column: 'email',
          operator: 'LIKE',
          value: '%@example.com',
          bKeepPercentAndDash: true,
          bBeginsWith: false,
          bEndsWith: true,
          bPg: true,
        }
        expect(params.operator).toBe('LIKE')
        expect(params.bKeepPercentAndDash).toBe(true)
        expect(params.bEndsWith).toBe(true)
        expect(params.bPg).toBe(true)
      }
    )

    it(
      'optional fields are undefined when not provided',
      () => {
        const params: WhereParams = { qb: {}, column: 'id', value: 1 }
        expect(params.operator).toBeUndefined()
        expect(params.bKeepPercentAndDash).toBeUndefined()
        expect(params.bBeginsWith).toBeUndefined()
        expect(params.bEndsWith).toBeUndefined()
        expect(params.bPg).toBeUndefined()
      }
    )

    it(
      'value can be any unknown type',
      () => {
        const withNumber: WhereParams = { qb: {}, column: 'age', value: 30 }
        const withNull: WhereParams = { qb: {}, column: 'deletedAt', value: null }
        const withArray: WhereParams = { qb: {}, column: 'tags', value: [1, 2] }
        expect(withNumber.value).toBe(30)
        expect(withNull.value).toBeNull()
        expect(Array.isArray(withArray.value)).toBe(true)
      }
    )
  }
)
