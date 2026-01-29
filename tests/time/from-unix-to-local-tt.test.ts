import { describe, expect, it } from 'bun:test'
import { FROM_UNIX_TO_LOCAL_TT } from '../../ts/time/from-unix-to-local-tt.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_UNIX_TO_LOCAL_TT',
  () => {
    it(
      'should format unix to local time with timezone',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_UNIX_TO_LOCAL_TT({ DateTime: MockDateTime, Settings: MockSettings, unix: 1672531200 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
