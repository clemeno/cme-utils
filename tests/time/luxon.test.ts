import { describe, expect, it } from 'bun:test'
import {
  LUXON_FORMAT_H,
  LUXON_FORMAT_HM,
  LUXON_FORMAT_HMS,
  LUXON_FORMAT_HMS_S,
  LUXON_FORMAT_Y,
  LUXON_FORMAT_YM,
  LUXON_FORMAT_YMD,
  LUXON_FORMAT_YMD_H,
  LUXON_FORMAT_YMD_HM,
  LUXON_FORMAT_YMD_HMS,
  LUXON_FORMAT_YMD_HMS_S,
  LUXON_FORMAT_YMD_HMS_Z,
  LUXON_FORMAT_YMD_HMS_S_Z,
  LUXON_FORMAT_YMD_HMS_O,
  LUXON_FORMAT_YMD_HMS_S_O,
  LUXON_FORMAT_LOCAL_HM,
  LUXON_FORMAT_LOCAL_HMS,
  LUXON_FORMAT_LOCAL_YMD,
  LUXON_FORMAT_LOCAL_YMD_HM,
  LUXON_FORMAT_LOCAL_YMD_HMS,
  LUXON_FORMAT_LOCAL_YMD_HMS_S,
  LUXON_FORMAT_LOCAL_YMD_HMS_Z,
  LUXON_FORMAT_LOCAL_YMD_HMS_S_Z,
  LUXON_FORMAT_LOCAL_YMD_HMS_O,
  LUXON_FORMAT_LOCAL_YMD_HMS_S_O,
  LUXON_FORMAT_LOCAL_LONG_MONTH,
  LUXON_FORMAT_LOCAL_LONG_MONTH_Y,
} from '../../ts/time/luxon.util.js'

describe(
  'luxon format constants',
  () => {
    const testCases = [
      { name: 'LUXON_FORMAT_H', value: LUXON_FORMAT_H, expected: 'HH' },
      { name: 'LUXON_FORMAT_HM', value: LUXON_FORMAT_HM, expected: 'HH:mm' },
      { name: 'LUXON_FORMAT_HMS', value: LUXON_FORMAT_HMS, expected: 'HH:mm:ss' },
      { name: 'LUXON_FORMAT_HMS_S', value: LUXON_FORMAT_HMS_S, expected: 'HH:mm:ss.SSS' },
      { name: 'LUXON_FORMAT_Y', value: LUXON_FORMAT_Y, expected: 'y' },
      { name: 'LUXON_FORMAT_YM', value: LUXON_FORMAT_YM, expected: 'y-MM' },
      { name: 'LUXON_FORMAT_YMD', value: LUXON_FORMAT_YMD, expected: 'y-MM-dd' },
      { name: 'LUXON_FORMAT_YMD_H', value: LUXON_FORMAT_YMD_H, expected: 'y-MM-dd HH' },
      { name: 'LUXON_FORMAT_YMD_HM', value: LUXON_FORMAT_YMD_HM, expected: 'y-MM-dd HH:mm' },
      { name: 'LUXON_FORMAT_YMD_HMS', value: LUXON_FORMAT_YMD_HMS, expected: 'y-MM-dd HH:mm:ss' },
      { name: 'LUXON_FORMAT_YMD_HMS_S', value: LUXON_FORMAT_YMD_HMS_S, expected: 'y-MM-dd HH:mm:ss.SSS' },
      { name: 'LUXON_FORMAT_YMD_HMS_Z', value: LUXON_FORMAT_YMD_HMS_Z, expected: 'y-MM-dd HH:mm:ss z' },
      { name: 'LUXON_FORMAT_YMD_HMS_S_Z', value: LUXON_FORMAT_YMD_HMS_S_Z, expected: 'y-MM-dd HH:mm:ss.SSS z' },
      { name: 'LUXON_FORMAT_YMD_HMS_O', value: LUXON_FORMAT_YMD_HMS_O, expected: 'y-MM-dd HH:mm:ss ZZ' },
      { name: 'LUXON_FORMAT_YMD_HMS_S_O', value: LUXON_FORMAT_YMD_HMS_S_O, expected: 'y-MM-dd HH:mm:ss.SSS ZZ' },
      { name: 'LUXON_FORMAT_LOCAL_HM', value: LUXON_FORMAT_LOCAL_HM, expected: 'T' },
      { name: 'LUXON_FORMAT_LOCAL_HMS', value: LUXON_FORMAT_LOCAL_HMS, expected: 'TT' },
      { name: 'LUXON_FORMAT_LOCAL_YMD', value: LUXON_FORMAT_LOCAL_YMD, expected: 'D' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HM', value: LUXON_FORMAT_LOCAL_YMD_HM, expected: 'D T' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS', value: LUXON_FORMAT_LOCAL_YMD_HMS, expected: 'D TT' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS_S', value: LUXON_FORMAT_LOCAL_YMD_HMS_S, expected: 'D TT.SSS' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS_Z', value: LUXON_FORMAT_LOCAL_YMD_HMS_Z, expected: 'D TT z' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS_S_Z', value: LUXON_FORMAT_LOCAL_YMD_HMS_S_Z, expected: 'D TT.SSS z' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS_O', value: LUXON_FORMAT_LOCAL_YMD_HMS_O, expected: 'D TT ZZ' },
      { name: 'LUXON_FORMAT_LOCAL_YMD_HMS_S_O', value: LUXON_FORMAT_LOCAL_YMD_HMS_S_O, expected: 'D TT.SSS ZZ' },
      { name: 'LUXON_FORMAT_LOCAL_LONG_MONTH', value: LUXON_FORMAT_LOCAL_LONG_MONTH, expected: 'MMMM' },
      { name: 'LUXON_FORMAT_LOCAL_LONG_MONTH_Y', value: LUXON_FORMAT_LOCAL_LONG_MONTH_Y, expected: 'MMMM y' },
    ]

    it.each(testCases)(
      '$name equals $expected',
      ({ value, expected }) => {
        expect(value).toBe(expected)
      }
    )
  }
)
