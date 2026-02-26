import { describe, expect, it } from 'bun:test'
import { BASE_CONVERT_BBSN } from '../../ts/convert/base-convert-bbsn.util.js'

describe(
  'BASE_CONVERT_BBSN',
  () => {
    describe(
      'from base 10',
      () => {
        const testCases = [
          { name: '0 in base 10 → base 16', n: '0', from: 10, to: 16, expected: '0' },
          { name: '255 in base 10 → base 16', n: '255', from: 10, to: 16, expected: 'ff' },
          { name: '256 in base 10 → base 16', n: '256', from: 10, to: 16, expected: '100' },
          { name: '10 in base 10 → base 2', n: '10', from: 10, to: 2, expected: '1010' },
          { name: '255 in base 10 → base 10', n: '255', from: 10, to: 10, expected: '255' },
          { name: '0 in base 10 → base 10', n: '0', from: 10, to: 10, expected: '0' },
        ]

        it.each(testCases)(
          '$name',
          ({ n, from, to, expected }) => {
            expect(BASE_CONVERT_BBSN({ n, from, to })).toBe(expected)
          }
        )
      }
    )

    describe(
      'from non-base-10 source',
      () => {
        const testCases = [
          { name: 'ff base 16 → base 10 (255)', n: 'ff', from: 16, to: 10, expected: '255' },
          { name: '1111 base 2 → base 10 (15)', n: '1111', from: 2, to: 10, expected: '15' },
          { name: 'a base 16 → base 10 (10)', n: 'a', from: 16, to: 10, expected: '10' },
          { name: '10 base 16 → base 10 (16)', n: '10', from: 16, to: 10, expected: '16' },
          { name: '1010 base 2 → base 10 (10)', n: '1010', from: 2, to: 10, expected: '10' },
          { name: 'ff base 16 → base 2', n: 'ff', from: 16, to: 2, expected: '11111111' },
          { name: '10 base 8 → base 10 (8)', n: '10', from: 8, to: 10, expected: '8' },
        ]

        it.each(testCases)(
          '$name',
          ({ n, from, to, expected }) => {
            expect(BASE_CONVERT_BBSN({ n, from, to })).toBe(expected)
          }
        )
      }
    )

    describe(
      'error cases return empty string',
      () => {
        it(
          'symbol not found (invalid char) returns empty string',
          () => {
            expect(BASE_CONVERT_BBSN({ n: '$', from: 16, to: 10 })).toBe('')
          }
        )

        it(
          'digit out of range for base returns empty string',
          () => {
            // 'a' (index 10) is not valid in base 8
            expect(BASE_CONVERT_BBSN({ n: 'a', from: 8, to: 10 })).toBe('')
          }
        )
      }
    )

    describe(
      'invalid base returns empty string',
      () => {
        it(
          'base from <= 0 returns empty string',
          () => {
            expect(BASE_CONVERT_BBSN({ n: '10', from: 0, to: 16 })).toBe('')
          }
        )

        it(
          'base to <= 0 returns empty string',
          () => {
            expect(BASE_CONVERT_BBSN({ n: '10', from: 10, to: 0 })).toBe('')
          }
        )
      }
    )
  }
)
