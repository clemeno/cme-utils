import { describe, expect, it } from 'bun:test'
import { NORMALIZE_PAGES } from '../../ts/query/normalize-pages.util.js'

describe(
  'NORMALIZE_PAGES',
  () => {
    const testCases = [
      { name: '100 items / 10 per page = 10 pages', normalizedPerPage: '10', filteredCount: '100', expected: '10' },
      { name: '101 items / 10 per page = 11 pages (ceil)', normalizedPerPage: '10', filteredCount: '101', expected: '11' },
      { name: '0 items = 0 pages', normalizedPerPage: '10', filteredCount: '0', expected: '0' },
      { name: '1 item / 10 per page = 1 page', normalizedPerPage: '10', filteredCount: '1', expected: '1' },
      { name: '100 items / 25 per page = 4 pages', normalizedPerPage: '25', filteredCount: '100', expected: '4' },
      { name: '99 items / 25 per page = 4 pages (ceil)', normalizedPerPage: '25', filteredCount: '99', expected: '4' },
      { name: '1 item / 1 per page = 1 page', normalizedPerPage: '1', filteredCount: '1', expected: '1' },
      { name: 'numeric inputs', normalizedPerPage: 10, filteredCount: 55, expected: '6' },
    ]

    it.each(testCases)(
      '$name',
      ({ normalizedPerPage, filteredCount, expected }) => {
        expect(NORMALIZE_PAGES({ normalizedPerPage, filteredCount })).toBe(expected)
      }
    )
  }
)
