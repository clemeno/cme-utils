import { describe, expect, it } from 'bun:test'
import { NORMALIZE_PAGE } from '../../ts/query/normalize-page.util.js'

describe(
  'NORMALIZE_PAGE',
  () => {
    const withinBoundsTestCases = [
      { name: 'page 1 with 10 pages', page: 1, pages: 10, expected: '1' },
      { name: 'page 5 with 10 pages', page: 5, pages: 10, expected: '5' },
      { name: 'page 10 with 10 pages', page: 10, pages: 10, expected: '10' },
    ]

    it.each(withinBoundsTestCases)(
      'should return page number as string when within bounds for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    const clampTestCases = [
      { name: 'page 15 with 10 pages', page: 15, pages: 10, expected: '10' },
      { name: 'page 100 with 5 pages', page: 100, pages: 5, expected: '5' },
    ]

    it.each(clampTestCases)(
      'should clamp page number to maximum pages for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    const lessThanOneTestCases = [
      { name: 'page 0 with 10 pages', page: 0, pages: 10, expected: '1' },
      { name: 'page -1 with 10 pages', page: -1, pages: 10, expected: '1' },
    ]

    it.each(lessThanOneTestCases)(
      'should handle page numbers less than 1 for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    const stringInputTestCases = [
      { name: 'page 1 with 10 pages', page: '1', pages: 10, expected: '1' },
      { name: 'page 5 with 10 pages', page: '5', pages: 10, expected: '5' },
    ]

    it.each(stringInputTestCases)(
      'should handle string inputs for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    const invalidInputTestCases = [
      { name: 'null page', page: null, pages: 10, expected: '1' },
      { name: 'undefined page', page: undefined, pages: 10, expected: '1' },
      { name: 'invalid string page', page: 'abc', pages: 10, expected: '1' },
    ]

    it.each(invalidInputTestCases)(
      'should handle invalid inputs for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    const invalidPagesTestCases = [
      { name: 'null pages', page: 5, pages: null, expected: '1' },
      { name: 'zero pages', page: 5, pages: 0, expected: '1' },
    ]

    it.each(invalidPagesTestCases)(
      'should handle invalid normalizedPages for $name',
      ({ page, pages, expected }) => {
        expect(NORMALIZE_PAGE({ page, normalizedPages: pages })).toBe(expected)
      }
    )

    it(
      'should return a string',
      () => {
        const result = NORMALIZE_PAGE({ page: 1, normalizedPages: 10 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
