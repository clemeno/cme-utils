import { describe, expect, it } from 'bun:test'
import { GET_TODAY_STOP } from '../../ts/time/get-today-stop.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_TODAY_STOP',
  () => {
    it(
      'should return today stop date',
      () => {
        const MockSettings = createMockSettings()
        const result = GET_TODAY_STOP({ DateTime: MockDateTime, Settings: MockSettings })
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
