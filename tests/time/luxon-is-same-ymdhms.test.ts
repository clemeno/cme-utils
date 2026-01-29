import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_YMDHMS } from '../../ts/time/luxon-is-same-ymdhms.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_YMDHMS',
  () => {
    const testCases = [
      {
        name: 'same year, month, day, hour, minute, second',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640995200000, // 2022-01-01T00:00:00
        expected: true,
      },
      {
        name: 'different dates',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640995201000, // 2022-01-01T00:00:01
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maTs, mbTs, expected }) => {
        const ma = mockDateTime(maTs)
        const mb = mockDateTime(mbTs)
        const result = LUXON_IS_SAME_YMDHMS({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
