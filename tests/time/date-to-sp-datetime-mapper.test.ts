import { describe, expect, it } from 'bun:test'
import { DATE_TO_SP_DATETIME_MAPPER } from '../../ts/time/date-to-sp-datetime-mapper.util.ts'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'DATE_TO_SP_DATETIME_MAPPER',
  () => {
    it(
      'should map date to sp datetime',
      () => {
        const result = DATE_TO_SP_DATETIME_MAPPER({
          DateTime: MockDateTime,
          at: [{ createdAt: new Date('2023-01-01') }],
          key: 'createdAt',
          dbTz: 'UTC',
        })
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(1)
        expect(result[0]).toHaveProperty('createdAt')
        expect(typeof result[0].createdAt).toBe('object')
      }
    )
  }
)
