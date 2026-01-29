import { describe, expect, it } from 'bun:test'
import { GET_7_DAYS_BEFORE_START } from '../../ts/time/get-7-days-before-start.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_7_DAYS_BEFORE_START',
  () => {
    it(
      'should return date 7 days before',
      () => {
        const MockSettings = createMockSettings()
        const result = GET_7_DAYS_BEFORE_START({ DateTime: MockDateTime, Settings: MockSettings })
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
