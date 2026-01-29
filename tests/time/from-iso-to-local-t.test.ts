import { describe, expect, it } from 'bun:test'
import { FROM_ISO_TO_LOCAL_T } from '../../ts/time/from-iso-to-local-t.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_ISO_TO_LOCAL_T',
  () => {
    it(
      'should format ISO to local time',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_ISO_TO_LOCAL_T({
          DateTime: MockDateTime,
          Settings: MockSettings,
          iso: '2023-01-01T00:00:00Z',
        })
        expect(typeof result).toBe('string')
      }
    )
  }
)
