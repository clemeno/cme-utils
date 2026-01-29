import { describe, expect, it } from 'bun:test'
import { GET_TZ } from '../../ts/time/get-tz.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_TZ',
  () => {
    it(
      'should return the timezone',
      () => {
        const MockSettings = createMockSettings()
        const result = GET_TZ(MockSettings)
        expect(typeof result).toBe('string')
      }
    )
  }
)
