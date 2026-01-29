import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_YMD } from '../../ts/time/luxon-is-same-ymd.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_YMD',
  () => {
    const testCases = [
      {
        name: 'same year, month, day',
        maTs: 1640995200000, // 2022-01-01
        mbTs: 1640995200000, // 2022-01-01
        expected: true,
      },
      {
        name: 'different dates',
        maTs: 1640995200000, // 2022-01-01
        mbTs: 1641081600000, // 2022-01-02
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maTs, mbTs, expected }) => {
        const ma = mockDateTime(maTs)
        const mb = mockDateTime(mbTs)
        const result = LUXON_IS_SAME_YMD({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
