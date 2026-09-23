import { describe, expect, it } from 'bun:test'
import { INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION } from '../../ts/chart/init-opti-time-number-avg-serie-function.util.js'
import { mockDateTime, type DurationObjectUnits } from '../mocks/luxon-mock.js'

describe(
  'INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION',
  () => {
    it.each<{ name: string, from: number, to: number, step: DurationObjectUnits, expected: Array<[number, number | null]> }>([
      { name: 'create an array of [timestamp, null] pairs for a single step', from: 1000, to: 1000, step: { milliseconds: 1000 }, expected: [[1000, null]] },
      { name: 'create multiple points for a range with steps', from: 1000, to: 3000, step: { milliseconds: 1000 }, expected: [[1000, null], [2000, null], [3000, null]] },
      { name: 'handle empty range (mFrom > mTo)', from: 3000, to: 1000, step: { milliseconds: 1000 }, expected: [] },
      { name: 'handle large step sizes', from: 100000, to: 200000, step: { milliseconds: 200000 }, expected: [[100000, null]] },
      // 2022-01-01 → 2022-01-02, 1 day step
      { name: 'work with different timestamp values', from: 1640995200000, to: 1641081600000, step: { milliseconds: 86400000 }, expected: [[1640995200000, null], [1641081600000, null]] },
      { name: 'handle exact boundary match', from: 2000, to: 2000, step: { milliseconds: 500 }, expected: [[2000, null]] },
      { name: 'handle very small ranges', from: 1000, to: 1500, step: { milliseconds: 1000 }, expected: [[1000, null]] },
    ])(
      'should $name',
      async ({ from, to, step, expected }) => {
        const result = await INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom: mockDateTime(from),
          mTo: mockDateTime(to),
          step,
        })

        expect(result).toEqual(expected)
      }
    )
  }
)
