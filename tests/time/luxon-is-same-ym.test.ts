import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_YM } from '../../ts/time/luxon-is-same-ym.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_YM',
  () => {
    const testCases = [
      {
        name: 'same year and month',
        maIso: '2023-01-01',
        mbIso: '2023-01-01',
        expected: true,
      },
      {
        name: 'different dates',
        maIso: '2023-01-01',
        mbIso: '2023-02-01',
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maIso, mbIso, expected }) => {
        const ma = MockDateTime.fromISO(maIso)
        const mb = MockDateTime.fromISO(mbIso)
        const result = LUXON_IS_SAME_YM({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
