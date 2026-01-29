import { describe, expect, it } from 'bun:test'
import { NORMALIZE_OFFSET } from '../../ts/query/normalize-offset.util.js'

describe(
  'NORMALIZE_OFFSET',
  () => {
    const offsetTestCases = [
      { name: 'page 1 with 10 per page', page: 1, perPage: 10, expected: '0' },
      { name: 'page 2 with 10 per page', page: 2, perPage: 10, expected: '10' },
      { name: 'page 3 with 10 per page', page: 3, perPage: 10, expected: '20' },
    ]

    it.each(offsetTestCases)(
      'should calculate offset correctly for $name',
      ({ page, perPage, expected }) => {
        expect(NORMALIZE_OFFSET({ normalizedPage: page, normalizedPerPage: perPage })).toBe(expected)
      }
    )

    const perPageTestCases = [
      { name: 'page 1 with 5 per page', page: 1, perPage: 5, expected: '0' },
      { name: 'page 2 with 5 per page', page: 2, perPage: 5, expected: '5' },
      { name: 'page 1 with 25 per page', page: 1, perPage: 25, expected: '0' },
      { name: 'page 3 with 25 per page', page: 3, perPage: 25, expected: '50' },
    ]

    it.each(perPageTestCases)(
      'should handle different perPage values for $name',
      ({ page, perPage, expected }) => {
        expect(NORMALIZE_OFFSET({ normalizedPage: page, normalizedPerPage: perPage })).toBe(expected)
      }
    )

    const stringInputTestCases = [
      { name: 'page 1 with 10 per page', page: '1', perPage: '10', expected: '0' },
      { name: 'page 2 with 10 per page', page: '2', perPage: '10', expected: '10' },
    ]

    it.each(stringInputTestCases)(
      'should handle string inputs for $name',
      ({ page, perPage, expected }) => {
        expect(NORMALIZE_OFFSET({ normalizedPage: page, normalizedPerPage: perPage })).toBe(expected)
      }
    )

    const decimalInputTestCases = [
      { name: 'page 1.0 with 10.0 per page', page: 1.0, perPage: 10.0, expected: '0' },
      { name: 'page 2.0 with 10.0 per page', page: 2.0, perPage: 10.0, expected: '10' },
    ]

    it.each(decimalInputTestCases)(
      'should handle decimal inputs for $name',
      ({ page, perPage, expected }) => {
        expect(NORMALIZE_OFFSET({ normalizedPage: page, normalizedPerPage: perPage })).toBe(expected)
      }
    )

    const invalidInputTestCases = [
      { name: 'null page', page: null, perPage: 10, expected: '' },
      { name: 'undefined page', page: undefined, perPage: 10, expected: '' },
      { name: 'invalid string page', page: 'abc', perPage: 10, expected: '' },
    ]

    it.each(invalidInputTestCases)(
      'should handle invalid inputs for $name',
      ({ page, perPage, expected }) => {
        expect(NORMALIZE_OFFSET({ normalizedPage: page, normalizedPerPage: perPage })).toBe(expected)
      }
    )

    it(
      'should return a string',
      () => {
        const result = NORMALIZE_OFFSET({ normalizedPage: 1, normalizedPerPage: 10 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
