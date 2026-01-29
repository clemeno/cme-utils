import { describe, expect, it } from 'bun:test'
import { NOW_APP } from '../../ts/time/now-app.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'NOW_APP',
  () => {
    it(
      'should return app current date',
      () => {
        const MockSettings = createMockSettings()
        const result = NOW_APP({ DateTime: MockDateTime, Settings: MockSettings })
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
