import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_YMDHM } from '../../ts/time/luxon-is-same-ymdhm.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_YMDHM',
  () => {
    const testCases = [
      {
        name: 'same year, month, day, hour, minute',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640995200000, // 2022-01-01T00:00:00
        expected: true,
      },
      {
        name: 'different minutes',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640995260000, // 2022-01-01T00:01:00
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maTs, mbTs, expected }) => {
        const ma = mockDateTime(maTs)
        const mb = mockDateTime(mbTs)
        const result = LUXON_IS_SAME_YMDHM({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
