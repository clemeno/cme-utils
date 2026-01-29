import { describe, expect, it } from 'bun:test'
import { NULL_DATE } from '../../ts/time/null-date.util.js'

describe(
  'NULL_DATE',
  () => {
    it(
      'should be a null date string',
      () => {
        expect(NULL_DATE).toBe('0000-01-01 00:00:00')
      }
    )
  }
)
