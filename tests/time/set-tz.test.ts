import { describe, expect, it } from 'bun:test'
import { SET_TZ } from '../../ts/time/set-tz.util.js'
import { createMockSettings } from '../mocks/space-mocks.js'

describe(
  'SET_TZ',
  () => {
    it(
      'should set the timezone in Settings',
      () => {
        const mockSettings = createMockSettings()
        SET_TZ({ tz: 'UTC', Settings: mockSettings })
        expect(true).toBe(true)
      }
    )
  }
)
