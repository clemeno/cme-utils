import { describe, expect, it } from 'bun:test'
import {
  PG_FORMAT_HI,
  PG_FORMAT_HIS,
  PG_FORMAT_ISO_DATE_TIME_UTC,
  PG_FORMAT_YM,
  PG_FORMAT_YMD,
  PG_FORMAT_YMDHI,
  PG_FORMAT_YMDHIS,
} from '../../ts/time/pg.util.js'

describe(
  'pg format constants',
  () => {
    const testCases = [
      { name: 'PG_FORMAT_YM', value: PG_FORMAT_YM, expected: 'YYYY-MM' },
      { name: 'PG_FORMAT_YMD', value: PG_FORMAT_YMD, expected: 'YYYY-MM-DD' },
      { name: 'PG_FORMAT_HI', value: PG_FORMAT_HI, expected: 'HH24:MI' },
      { name: 'PG_FORMAT_HIS', value: PG_FORMAT_HIS, expected: 'HH24:MI:SS' },
      { name: 'PG_FORMAT_YMDHI', value: PG_FORMAT_YMDHI, expected: 'YYYY-MM-DD HH24:MI' },
      { name: 'PG_FORMAT_YMDHIS', value: PG_FORMAT_YMDHIS, expected: 'YYYY-MM-DD HH24:MI:SS' },
      { name: 'PG_FORMAT_ISO_DATE_TIME_UTC', value: PG_FORMAT_ISO_DATE_TIME_UTC, expected: 'YYYY-MM-DD"T"HH24:MI:SS"Z"' },
    ]

    it.each(testCases)(
      '$name equals $expected',
      ({ value, expected }) => {
        expect(value).toBe(expected)
      }
    )
  }
)
