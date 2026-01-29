import { describe, expect, it } from 'bun:test'
import { FROM_UNIX_TO_LOCAL_DTT } from '../../ts/time/from-unix-to-local-dtt.util.js'
import { MockDateTime, createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'FROM_UNIX_TO_LOCAL_DTT',
  () => {
    it(
      'should format unix to local date time with timezone',
      () => {
        const MockSettings = createMockSettings()
        const result = FROM_UNIX_TO_LOCAL_DTT({ DateTime: MockDateTime, Settings: MockSettings, unix: 1672531200 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
