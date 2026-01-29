import { describe, expect, it } from 'bun:test'
import { NORMALIZE_LIMIT } from '../../ts/query/normalize-limit.util.js'

describe(
  'NORMALIZE_LIMIT',
  () => {
    const numberTestCases = [
      { name: '10', input: 10, expected: '10' },
      { name: '0', input: 0, expected: '0' },
      { name: '1000', input: 1000, expected: '1000' },
    ]

    it.each(numberTestCases)(
      'should convert number $name to string',
      ({ input, expected }) => {
        expect(NORMALIZE_LIMIT(input)).toBe(expected)
      }
    )

    const decimalTestCases = [
      { name: '10.5', input: 10.5, expected: '10.5' },
      { name: '0.0', input: 0.0, expected: '0' },
    ]

    it.each(decimalTestCases)(
      'should handle decimal number $name',
      ({ input, expected }) => {
        expect(NORMALIZE_LIMIT(input)).toBe(expected)
      }
    )

    const stringNumberTestCases = [
      { name: '10', input: '10' as any, expected: '10' },
      { name: '0', input: '0' as any, expected: '0' },
    ]

    it.each(stringNumberTestCases)(
      'should handle string number $name',
      ({ input, expected }) => {
        expect(NORMALIZE_LIMIT(input)).toBe(expected)
      }
    )

    const nullUndefinedTestCases = [
      { name: 'null', input: null as any, expected: '' },
      { name: 'undefined', input: undefined as any, expected: '' },
    ]

    it.each(nullUndefinedTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        expect(NORMALIZE_LIMIT(input)).toBe(expected)
      }
    )

    const booleanTestCases = [
      { name: 'true', input: true as any, expected: 'true' },
      { name: 'false', input: false as any, expected: 'false' },
    ]

    it.each(booleanTestCases)(
      'should handle boolean $name',
      ({ input, expected }) => {
        expect(NORMALIZE_LIMIT(input)).toBe(expected)
      }
    )

    it(
      'should return a string',
      () => {
        const result = NORMALIZE_LIMIT(42)
        expect(typeof result).toBe('string')
      }
    )
  }
)
