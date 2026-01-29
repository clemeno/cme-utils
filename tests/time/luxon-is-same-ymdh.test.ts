import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_YMDH } from '../../ts/time/luxon-is-same-ymdh.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_YMDH',
  () => {
    const testCases = [
      {
        name: 'same year, month, day, hour',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640995200000, // 2022-01-01T00:00:00
        expected: true,
      },
      {
        name: 'different hours',
        maTs: 1640995200000, // 2022-01-01T00:00:00
        mbTs: 1640998800000, // 2022-01-01T01:00:00
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maTs, mbTs, expected }) => {
        const ma = mockDateTime(maTs)
        const mb = mockDateTime(mbTs)
        const result = LUXON_IS_SAME_YMDH({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
