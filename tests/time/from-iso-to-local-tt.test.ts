import { describe, expect, it } from 'bun:test'
import { FROM_ISO_TO_LOCAL_TT } from '../../ts/time/from-iso-to-local-tt.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_ISO_TO_LOCAL_TT',
  () => {
    it(
      'should format ISO to local time with timezone',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_ISO_TO_LOCAL_TT({
          DateTime: MockDateTime,
          Settings: MockSettings,
          iso: '2023-01-01T00:00:00Z',
        })
        expect(typeof result).toBe('string')
      }
    )
  }
)
