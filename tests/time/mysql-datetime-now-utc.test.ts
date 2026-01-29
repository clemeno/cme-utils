import { describe, expect, it } from 'bun:test'
import { MYSQL_DATETIME_NOW_UTC } from '../../ts/time/mysql-datetime-now-utc.util.js'

describe(
  'MYSQL_DATETIME_NOW_UTC',
  () => {
    it(
      'should return MySQL datetime string',
      () => {
        const result = MYSQL_DATETIME_NOW_UTC()
        expect(typeof result).toBe('string')
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      }
    )
  }
)
