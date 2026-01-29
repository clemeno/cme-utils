import { describe, expect, it } from 'bun:test'
import { FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT } from '../../ts/time/from-any-db-moment-to-sp-datetime-object.util.ts'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT',
  () => {
    it(
      'should convert db moment to sp datetime object',
      () => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from: '2023-01-01 00:00:00',
          dbTz: 'UTC',
        })
        expect(result).toHaveProperty('date')
      }
    )
  }
)
