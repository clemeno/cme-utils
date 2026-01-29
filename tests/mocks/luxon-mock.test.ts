import { describe, expect, it } from 'bun:test'
import { mockDateTime, type DurationObjectUnits } from './luxon-mock.js'

describe(
  'Luxon DateTime Mock',
  () => {
    describe(
      'createMockDateTime',
      () => {
        it(
          'should create a mock DateTime with given milliseconds',
          () => {
            const mock = mockDateTime(1000)
            expect(mock.toMillis()).toBe(1000)
            expect(mock.valueOf()).toBe(1000)
          }
        )

        it(
          'should create mock with zero milliseconds',
          () => {
            const mock = mockDateTime(0)
            expect(mock.toMillis()).toBe(0)
            expect(mock.valueOf()).toBe(0)
          }
        )

        it(
          'should create mock with large millisecond values',
          () => {
            const largeMillis = 1640995200000 // 2022-01-01T00:00:00.000Z
            const mock = mockDateTime(largeMillis)
            expect(mock.toMillis()).toBe(largeMillis)
            expect(mock.valueOf()).toBe(largeMillis)
          }
        )
      }
    )

    describe(
      'plus method',
      () => {
        it(
          'should add milliseconds correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ milliseconds: 500 })
            expect(result.toMillis()).toBe(1500)
          }
        )

        it(
          'should add seconds correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ seconds: 2 })
            expect(result.toMillis()).toBe(3000) // 1000 + 2000
          }
        )

        it(
          'should add minutes correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ minutes: 1 })
            expect(result.toMillis()).toBe(61000) // 1000 + 60000
          }
        )

        it(
          'should add hours correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ hours: 1 })
            expect(result.toMillis()).toBe(3601000) // 1000 + 3600000
          }
        )

        it(
          'should add days correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ days: 1 })
            expect(result.toMillis()).toBe(86401000) // 1000 + 86400000
          }
        )

        it(
          'should add weeks correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ weeks: 1 })
            expect(result.toMillis()).toBe(604801000) // 1000 + 604800000
          }
        )

        it(
          'should add months correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ months: 1 })
            expect(result.toMillis()).toBe(1000 + 2592000000) // 1000 + 2592000000
          }
        )

        it(
          'should add quarters correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ quarters: 1 })
            expect(result.toMillis()).toBe(1000 + 7776000000) // 1000 + 7776000000
          }
        )

        it(
          'should add years correctly',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({ years: 1 })
            expect(result.toMillis()).toBe(1000 + 31536000000) // 1000 + 31536000000
          }
        )

        it(
          'should handle multiple duration units simultaneously',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({
              hours: 1,
              minutes: 30,
              seconds: 45,
              milliseconds: 500,
            })
            // 1 hour + 30 min + 45 sec + 500 ms = 3600000 + 1800000 + 45000 + 500 = 5445500
            expect(result.toMillis()).toBe(1000 + 5445500)
          }
        )

        it(
          'should handle empty duration object',
          () => {
            const mock = mockDateTime(1000)
            const result = mock.plus({})
            expect(result.toMillis()).toBe(1000)
          }
        )

        it(
          'should handle undefined duration values',
          () => {
            const mock = mockDateTime(1000)
            const duration: DurationObjectUnits = {
              hours: undefined,
              minutes: 5,
              seconds: undefined,
            }
            const result = mock.plus(duration)
            expect(result.toMillis()).toBe(1000 + 300000) // 5 minutes
          }
        )
      }
    )

    describe(
      'setZone and toFormat methods',
      () => {
        it(
          'should format date as yyyy-MM-dd correctly',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('yyyy-MM-dd')).toBe('2022-01-01')
          }
        )

        it(
          'should format date as MM/dd/yyyy correctly',
          () => {
            const mock = mockDateTime(1643846400000) // 2022-02-03T00:00:00.000Z
            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('MM/dd/yyyy')).toBe('02/03/2022')
          }
        )

        it(
          'should format date as dd/MM/yyyy correctly',
          () => {
            const mock = mockDateTime(1643846400000) // 2022-02-03T00:00:00.000Z
            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('dd/MM/yyyy')).toBe('03/02/2022')
          }
        )

        it(
          'should handle different dates correctly',
          () => {
            const mock = mockDateTime(0) // 1970-01-01T00:00:00.000Z
            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('yyyy-MM-dd')).toBe('1970-01-01')
          }
        )

        it(
          'should handle unsupported format by falling back to yyyy-MM-dd',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('unsupported')).toBe('2022-01-01')
          }
        )

        it(
          'should work with any timezone string',
          () => {
            const mock = mockDateTime(1640995200000)
            const zoned = mock.setZone('America/New_York')
            expect(zoned.toFormat('yyyy-MM-dd')).toBe('2022-01-01')
          }
        )
      }
    )

    describe(
      'valueOf method',
      () => {
        it(
          'should return the same value as toMillis',
          () => {
            const mock = mockDateTime(123456789)
            expect(mock.valueOf()).toBe(mock.toMillis())
          }
        )

        it(
          'should return original millisecond value',
          () => {
            const originalMillis = 987654321
            const mock = mockDateTime(originalMillis)
            expect(mock.valueOf()).toBe(originalMillis)
          }
        )
      }
    )

    describe(
      'integration tests',
      () => {
        it(
          'should chain operations correctly',
          () => {
            const mock = mockDateTime(1000)
              .plus({ hours: 1 })
              .plus({ minutes: 30 })

            expect(mock.toMillis()).toBe(1000 + 3600000 + 1800000) // 1 hour + 30 min
          }
        )

        it(
          'should maintain immutability',
          () => {
            const original = mockDateTime(1000)
            const modified = original.plus({ seconds: 30 })

            expect(original.toMillis()).toBe(1000)
            expect(modified.toMillis()).toBe(31000)
          }
        )

        it(
          'should handle complex date operations',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01
              .plus({ days: 5 })
              .plus({ hours: 12 })

            const zoned = mock.setZone('UTC')
            expect(zoned.toFormat('yyyy-MM-dd')).toBe('2022-01-06')
          }
        )
      }
    )

    describe(
      'getters',
      () => {
        it(
          'should return correct year',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.year).toBe(2022)
          }
        )

        it(
          'should return correct month',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.month).toBe(1)
          }
        )

        it(
          'should return correct day',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.day).toBe(1)
          }
        )

        it(
          'should return correct hour',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.hour).toBe(0)
          }
        )

        it(
          'should return correct minute',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.minute).toBe(0)
          }
        )

        it(
          'should return correct second',
          () => {
            const mock = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
            expect(mock.second).toBe(0)
          }
        )

        it(
          'should return correct values for non-zero time components',
          () => {
            const mock = mockDateTime(1640995261500) // 2022-01-01T00:01:01.500Z
            expect(mock.year).toBe(2022)
            expect(mock.month).toBe(1)
            expect(mock.day).toBe(1)
            expect(mock.hour).toBe(0)
            expect(mock.minute).toBe(1)
            expect(mock.second).toBe(1)
          }
        )
      }
    )
  }
)
