import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME } from '../../ts/time/luxon-is-same.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME',
  () => {
    const testCases = [
      { name: 'same dates', input: { maTs: 1640995200000, mbTs: 1640995200000 }, expected: true },
      { name: 'different dates', input: { maTs: 1640995200000, mbTs: 1641081600000 }, expected: false },
    ]

    it.each(testCases)(
      '$name',
      tc => {
        const ma = mockDateTime(tc.input.maTs)
        const mb = mockDateTime(tc.input.mbTs)
        const result = LUXON_IS_SAME({ ma, mb })
        expect(result).toBe(tc.expected)
      }
    )
  }
)
