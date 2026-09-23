import { describe, expect, it } from 'bun:test'
import { INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION } from '../../ts/chart/init-opti-time-number-serie-function.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'
import type { DurationObjectUnits } from '../mocks/luxon-mock.js'

describe(
  'INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION',
  () => {
    it.each<{
      name: string
      input: { mFrom: ReturnType<typeof mockDateTime>, mTo: ReturnType<typeof mockDateTime>, step: DurationObjectUnits }
      expected: Array<[number, number]>
    }>([
      { name: 'should create an array of [timestamp, 0] pairs for a single step', input: { mFrom: mockDateTime(1000), mTo: mockDateTime(1000), step: { milliseconds: 1000 } }, expected: [[1000, 0]] },
      { name: 'should create multiple points for a range with steps', input: { mFrom: mockDateTime(1000), mTo: mockDateTime(3000), step: { milliseconds: 1000 } }, expected: [[1000, 0], [2000, 0], [3000, 0]] },
      { name: 'should handle empty range (mFrom > mTo)', input: { mFrom: mockDateTime(3000), mTo: mockDateTime(1000), step: { milliseconds: 1000 } }, expected: [] },
      { name: 'should handle large step sizes', input: { mFrom: mockDateTime(100000), mTo: mockDateTime(200000), step: { milliseconds: 200000 } }, expected: [[100000, 0]] },
      {
        name: 'should work with different timestamp values',
        input: {
          mFrom: mockDateTime(1640995200000), // 2022-01-01
          mTo: mockDateTime(1641081600000), // 2022-01-02
          step: { milliseconds: 86400000 }, // 1 day
        },
        expected: [[1640995200000, 0], [1641081600000, 0]],
      },
      { name: 'should handle exact boundary match', input: { mFrom: mockDateTime(2000), mTo: mockDateTime(2000), step: { milliseconds: 500 } }, expected: [[2000, 0]] },
      { name: 'should handle very small ranges', input: { mFrom: mockDateTime(1000), mTo: mockDateTime(1500), step: { milliseconds: 1000 } }, expected: [[1000, 0]] },
      { name: 'should stop before mTo when the step does not divide the range', input: { mFrom: mockDateTime(1000), mTo: mockDateTime(2500), step: { milliseconds: 1000 } }, expected: [[1000, 0], [2000, 0]] },
    ])(
      '$name',
      async ({ input, expected }) => {
        expect(await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION(input)).toEqual(expected)
      }
    )
  }
)
