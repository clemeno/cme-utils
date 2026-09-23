import { describe, expect, it } from 'bun:test'
import { NORMALIZE_PAGINATION } from '../../ts/query/normalize-pagination.util.js'
import type { numeric } from '../../ts/numeric.js'

describe(
  'NORMALIZE_PAGINATION',
  () => {
    const testCases: Array<{
      name: string
      input: { page: numeric, perPage: numeric, filteredCount: numeric }
      expected: { normalizedPage: string, normalizedPerPage: string, normalizedPages: string, normalizedOffset: string, normalizedLimit: string }
    }> = [
      { name: 'page 1 of 10, 100 items', input: { page: '1', perPage: '10', filteredCount: '100' }, expected: { normalizedPage: '1', normalizedPerPage: '10', normalizedPages: '10', normalizedOffset: '0', normalizedLimit: '10' } },
      { name: 'last partial page: page 3 of 3, 25 items', input: { page: '3', perPage: '10', filteredCount: '25' }, expected: { normalizedPage: '3', normalizedPerPage: '10', normalizedPages: '3', normalizedOffset: '20', normalizedLimit: '10' } },
      { name: 'page exceeds total pages → clamped to last page', input: { page: '99', perPage: '10', filteredCount: '20' }, expected: { normalizedPage: '2', normalizedPerPage: '10', normalizedPages: '2', normalizedOffset: '10', normalizedLimit: '10' } },
      { name: 'numbers instead of strings → same normalized strings', input: { page: 2, perPage: 10, filteredCount: 25 }, expected: { normalizedPage: '2', normalizedPerPage: '10', normalizedPages: '3', normalizedOffset: '10', normalizedLimit: '10' } },
      { name: 'no items → 0 pages, page stays 1, offset 0', input: { page: '1', perPage: '10', filteredCount: '0' }, expected: { normalizedPage: '1', normalizedPerPage: '10', normalizedPages: '0', normalizedOffset: '0', normalizedLimit: '10' } },
      { name: 'page 0 → raised to 1', input: { page: '0', perPage: '10', filteredCount: '25' }, expected: { normalizedPage: '1', normalizedPerPage: '10', normalizedPages: '3', normalizedOffset: '0', normalizedLimit: '10' } },
      { name: 'negative page → raised to 1', input: { page: '-3', perPage: '10', filteredCount: '25' }, expected: { normalizedPage: '1', normalizedPerPage: '10', normalizedPages: '3', normalizedOffset: '0', normalizedLimit: '10' } },
      { name: 'perPage 0 → raised to 1', input: { page: '2', perPage: '0', filteredCount: '25' }, expected: { normalizedPage: '2', normalizedPerPage: '1', normalizedPages: '25', normalizedOffset: '1', normalizedLimit: '1' } },
      { name: 'non-numeric page and perPage → 1', input: { page: 'abc', perPage: 'x', filteredCount: '25' }, expected: { normalizedPage: '1', normalizedPerPage: '1', normalizedPages: '25', normalizedOffset: '0', normalizedLimit: '1' } },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(NORMALIZE_PAGINATION(input)).toEqual(expected)
      }
    )
  }
)
