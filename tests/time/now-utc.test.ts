import { describe, expect, it } from 'bun:test'
import { NOW_UTC } from '../../ts/time/now-utc.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'NOW_UTC',
  () => {
    it(
      'should return current UTC date',
      () => {
        const result = NOW_UTC(MockDateTime)
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
