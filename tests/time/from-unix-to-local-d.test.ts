import { describe, expect, it } from 'bun:test'
import { FROM_UNIX_TO_LOCAL_D } from '../../ts/time/from-unix-to-local-d.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_UNIX_TO_LOCAL_D',
  () => {
    it(
      'should format unix to local date',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_UNIX_TO_LOCAL_D({
          DateTime: MockDateTime,
          Settings: MockSettings,
          unix: 1672531200,
        })
        expect(typeof result).toBe('string')
      }
    )
  }
)
