import { describe, expect, it } from 'bun:test'
import { NOW_APP_ISO } from '../../ts/time/now-app-iso.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'NOW_APP_ISO',
  () => {
    it(
      'should return app current ISO string',
      () => {
        const MockSettings = createMockSettings()
        const result = NOW_APP_ISO({ DateTime: MockDateTime, Settings: MockSettings })
        expect(typeof result).toBe('string')
      }
    )
  }
)
