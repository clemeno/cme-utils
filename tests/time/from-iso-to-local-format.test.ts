import { describe, expect, it } from 'bun:test'
import { FROM_ISO_TO_LOCAL_FORMAT } from '../../ts/time/from-iso-to-local-format.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_ISO_TO_LOCAL_FORMAT',
  () => {
    it(
      'should format ISO to local format',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_ISO_TO_LOCAL_FORMAT({
          DateTime: MockDateTime,
          Settings: MockSettings,
          iso: '2023-01-01T00:00:00Z',
          format: 'yyyy-MM-dd',
        })
        expect(typeof result).toBe('string')
      }
    )
  }
)
