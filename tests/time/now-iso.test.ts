import { describe, expect, it } from 'bun:test'
import { NOW_ISO } from '../../ts/time/now-iso.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'NOW_ISO',
  () => {
    it(
      'should return current ISO string',
      () => {
        const result = NOW_ISO(MockDateTime)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      }
    )
  }
)
