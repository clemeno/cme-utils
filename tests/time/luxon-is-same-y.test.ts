import { describe, expect, it } from 'bun:test'
import { LUXON_IS_SAME_Y } from '../../ts/time/luxon-is-same-y.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'LUXON_IS_SAME_Y',
  () => {
    const testCases = [
      {
        name: 'same year',
        maIso: '2023-01-01',
        mbIso: '2023-12-31',
        expected: true,
      },
      {
        name: 'different years',
        maIso: '2023-01-01',
        mbIso: '2024-01-01',
        expected: false,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, maIso, mbIso, expected }) => {
        const ma = MockDateTime.fromISO(maIso)
        const mb = MockDateTime.fromISO(mbIso)
        const result = LUXON_IS_SAME_Y({ ma, mb })
        expect(result).toBe(expected)
      }
    )
  }
)
