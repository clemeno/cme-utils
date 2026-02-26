import { describe, expect, it } from 'bun:test'
import { NORMALIZE_PAGINATION } from '../../ts/query/normalize-pagination.util.js'

describe(
  'NORMALIZE_PAGINATION',
  () => {
    it(
      'page 1 of 10, 100 items',
      () => {
        const result = NORMALIZE_PAGINATION({ page: '1', perPage: '10', filteredCount: '100' })
        expect(result).toEqual({
          normalizedPage: '1',
          normalizedPerPage: '10',
          normalizedPages: '10',
          normalizedOffset: '0',
          normalizedLimit: '10',
        })
      }
    )

    it(
      'page 3 of 3, 25 items',
      () => {
        const result = NORMALIZE_PAGINATION({ page: '3', perPage: '10', filteredCount: '25' })
        expect(result).toEqual({
          normalizedPage: '3',
          normalizedPerPage: '10',
          normalizedPages: '3',
          normalizedOffset: '20',
          normalizedLimit: '10',
        })
      }
    )

    it(
      'page exceeds total pages → clamped to last page',
      () => {
        const result = NORMALIZE_PAGINATION({ page: '99', perPage: '10', filteredCount: '20' })
        expect(result).toEqual({
          normalizedPage: '2',
          normalizedPerPage: '10',
          normalizedPages: '2',
          normalizedOffset: '10',
          normalizedLimit: '10',
        })
      }
    )

    it(
      'returns an object with all expected keys',
      () => {
        const result = NORMALIZE_PAGINATION({ page: '1', perPage: '20', filteredCount: '200' })
        expect(Object.keys(result).sort()).toEqual([
          'normalizedLimit',
          'normalizedOffset',
          'normalizedPage',
          'normalizedPages',
          'normalizedPerPage',
        ])
      }
    )
  }
)
