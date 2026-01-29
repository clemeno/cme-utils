import { describe, expect, it } from 'bun:test'
import { FROM_SP_DATETIME_OBJECT_TO_LUXON } from '../../ts/time/from-sp-datetime-object-to-luxon.util.ts'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'FROM_SP_DATETIME_OBJECT_TO_LUXON',
  () => {
    it(
      'should convert sp datetime object to luxon',
      () => {
        const result = FROM_SP_DATETIME_OBJECT_TO_LUXON({
          DateTime: MockDateTime,
          spDate: { date: '2023-01-01', time: '00:00:00', timezone: 'UTC' },
        })
        expect(result).toHaveProperty('toMillis')
      }
    )
  }
)
