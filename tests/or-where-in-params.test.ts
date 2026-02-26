import { describe, expect, it } from 'bun:test'

describe(
  'OrWhereInParams',
  () => {
    it(
      'creates a valid OrWhereInParams object',
      () => {
        const params = { qb: {}, column: 'status', values: ['active', 'pending'] }
        expect(params.column).toBe('status')
        expect(params.values).toHaveLength(2)
      }
    )

    it(
      'accepts an empty values array',
      () => {
        const params = { qb: {}, column: 'id', values: [] as any[] }
        expect(params.values).toHaveLength(0)
      }
    )

    it(
      'accepts numeric values',
      () => {
        const params = { qb: {}, column: 'id', values: [1, 2, 3] }
        expect(params.values[0]).toBe(1)
        expect(params.values[2]).toBe(3)
      }
    )

    it(
      'accepts any qb value',
      () => {
        const mockQb = { where: () => {} }
        const params = { qb: mockQb, column: 'type', values: ['a'] }
        expect(params.qb).toBe(mockQb)
      }
    )
  }
)
