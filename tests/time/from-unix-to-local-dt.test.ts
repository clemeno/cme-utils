import { describe, expect, it } from 'bun:test'
import { FROM_UNIX_TO_LOCAL_DT } from '../../ts/time/from-unix-to-local-dt.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_UNIX_TO_LOCAL_DT',
  () => {
    it(
      'should format unix to local date time',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_UNIX_TO_LOCAL_DT({
          DateTime: MockDateTime,
          Settings: MockSettings,
          unix: 1672531200,
        })
        expect(typeof result).toBe('string')
      }
    )
  }
)
