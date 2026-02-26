import { describe, expect, it } from 'bun:test'
import { FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT } from '../../ts/time/from-any-db-moment-to-sp-datetime-object.util.ts'
import { MockDateTime } from '../mocks/luxon-mock.js'
import { NULL_DATE } from '../../ts/time/null-date.util.js'

describe(
  'FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT',
  () => {
    it(
      'converts ISO string to sp datetime object',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: '2023-01-01 00:00:00',
          dbTz: 'UTC',
        })
        expect(result).toHaveProperty('date')
        expect(result).toHaveProperty('timezone_type', 3)
        expect(result).toHaveProperty('timezone')
      }
    )

    it(
      'returns null for NULL_DATE sentinel',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: NULL_DATE,
          dbTz: 'UTC',
        })
        expect(result).toBeNull()
      }
    )

    it(
      'converts JS Date (instanceof Date) via fromMillis',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: new Date('2023-06-15T12:00:00.000Z'),
          dbTz: 'UTC',
        })
        expect(result).toHaveProperty('date')
      }
    )

    it(
      'converts numeric timestamp via fromMillis',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: 1686830400000,
          dbTz: 'UTC',
        })
        expect(result).toHaveProperty('date')
      }
    )

    it(
      'converts a DateTime instance (instanceof DateTimeClass) via setZone',
      () => {
        // Build an instance that passes `instanceof MockDateTime` (the DateTimeClass)
        // and exposes the instance methods the util calls after setZone().
        class DateTimeSubInstance extends MockDateTime {
          setZone (_tz: string) { return this }
          toSQL (_opts?: any) { return '2023-01-01 00:00:00' }
          get zoneName () { return 'UTC' }
        }
        const instance = new DateTimeSubInstance()
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: instance,
          dbTz: 'UTC',
        })
        expect(result).toHaveProperty('date')
      }
    )

    it(
      'returns null for null input',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: null,
          dbTz: 'UTC',
        })
        expect(result).toBeNull()
      }
    )
  }
)
