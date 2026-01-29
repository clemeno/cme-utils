import { describe, expect, it } from 'bun:test'
import { GET_DAY_STOP } from '../../ts/time/get-day-stop.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_DAY_STOP',
  () => {
    it(
      'should return day stop date',
      () => {
        const MockSettings = createMockSettings()
        const result = GET_DAY_STOP({ DateTime: MockDateTime, Settings: MockSettings })
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
