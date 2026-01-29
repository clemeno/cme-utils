import { describe, expect, it } from 'bun:test'
import { FROM_UNIX_TO_LOCAL_FORMAT } from '../../ts/time/from-unix-to-local-format.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_UNIX_TO_LOCAL_FORMAT',
  () => {
    it(
      'should format unix to local format',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_UNIX_TO_LOCAL_FORMAT({ DateTime: MockDateTime, Settings: MockSettings, unix: 1672531200, format: 'yyyy-MM-dd' })
        expect(typeof result).toBe('string')
      }
    )
  }
)
