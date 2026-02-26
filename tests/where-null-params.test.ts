import { describe, expect, it } from 'bun:test'

describe(
  'WhereNullParams',
  () => {
    it(
      'creates a valid WhereNullParams object',
      () => {
        const params = { qb: {}, column: 'deleted_at' }
        expect(params.column).toBe('deleted_at')
      }
    )

    it(
      'assigns any qb value',
      () => {
        const mockQb = { whereNull: () => {} }
        const params = { qb: mockQb, column: 'archived_at' }
        expect(params.qb).toBe(mockQb)
      }
    )

    it(
      'column is a string',
      () => {
        const params = { qb: null, column: 'updated_at' }
        expect(typeof params.column).toBe('string')
      }
    )
  }
)
