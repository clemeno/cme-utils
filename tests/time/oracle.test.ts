import { describe, expect, it } from 'bun:test'
import {
  ORACLE_FORMAT_HI,
  ORACLE_FORMAT_HIS,
  ORACLE_FORMAT_ISO_DATE_TIME_UTC,
  ORACLE_FORMAT_YM,
  ORACLE_FORMAT_YMD,
  ORACLE_FORMAT_YMDHI,
  ORACLE_FORMAT_YMDHIS,
} from '../../ts/time/oracle.util.js'

describe(
  'oracle format constants',
  () => {
    const testCases = [
      { name: 'ORACLE_FORMAT_YM', value: ORACLE_FORMAT_YM, expected: 'yyyy-mm' },
      { name: 'ORACLE_FORMAT_YMD', value: ORACLE_FORMAT_YMD, expected: 'yyyy-mm-dd' },
      { name: 'ORACLE_FORMAT_HI', value: ORACLE_FORMAT_HI, expected: 'hh24:mi' },
      { name: 'ORACLE_FORMAT_HIS', value: ORACLE_FORMAT_HIS, expected: 'hh24:mi:ss' },
      { name: 'ORACLE_FORMAT_YMDHI', value: ORACLE_FORMAT_YMDHI, expected: 'yyyy-mm-dd hh24:mi' },
      { name: 'ORACLE_FORMAT_YMDHIS', value: ORACLE_FORMAT_YMDHIS, expected: 'yyyy-mm-dd hh24:mi:ss' },
      { name: 'ORACLE_FORMAT_ISO_DATE_TIME_UTC', value: ORACLE_FORMAT_ISO_DATE_TIME_UTC, expected: 'yyyy-mm-dd"T"hh24:mi:ss"Z"' },
    ]

    it.each(testCases)(
      '$name equals $expected',
      ({ value, expected }) => {
        expect(value).toBe(expected)
      }
    )
  }
)
