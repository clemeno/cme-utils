import { describe, expect, it } from 'bun:test'
import { NOW_UTC_ISO } from '../../ts/time/now-utc-iso.util.js'

describe(
  'NOW_UTC_ISO',
  () => {
    it(
      'should return current UTC ISO string',
      () => {
        const result = NOW_UTC_ISO()
        expect(typeof result).toBe('string')
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      }
    )
  }
)
