import { describe, expect, it } from 'bun:test'
import { INIT_TIME_NUMBER_SERIE_FUNCTION } from '../../ts/chart/init-time-number-serie-function.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'INIT_TIME_NUMBER_SERIE_FUNCTION',
  () => {
    it.each<{ name: string, input: { fromMs: number, toMs: number, stepMs: number }, expected: Array<{ name: string, y: number }> }>([
      {
        name: 'should create an array of objects with formatted names and 0 y values for a single step',
        input: { fromMs: 1000, toMs: 1000, stepMs: 1000 },
        expected: [{ name: '1970-01-01', y: 0 }],
      },
      {
        name: 'should create multiple points for a range with steps (00:00:01 → 00:00:03)',
        input: { fromMs: 1000, toMs: 3000, stepMs: 1000 },
        expected: [
          { name: '1970-01-01', y: 0 },
          { name: '1970-01-01', y: 0 },
          { name: '1970-01-01', y: 0 },
        ],
      },
      {
        name: 'should handle empty range (mFrom > mTo)',
        input: { fromMs: 3000, toMs: 1000, stepMs: 1000 },
        expected: [],
      },
      {
        name: 'should handle large step sizes',
        input: { fromMs: 1000, toMs: 2000, stepMs: 2000 },
        expected: [{ name: '1970-01-01', y: 0 }],
      },
      {
        name: 'should create one point per day with a 1-day step (2022-01-01 → 2022-01-02)',
        input: { fromMs: 1640995200000, toMs: 1641081600000, stepMs: 86400000 },
        expected: [
          { name: '2022-01-01', y: 0 },
          { name: '2022-01-02', y: 0 },
        ],
      },
      {
        name: 'should handle exact boundary match',
        input: { fromMs: 2000, toMs: 2000, stepMs: 500 },
        expected: [{ name: '1970-01-01', y: 0 }],
      },
      {
        name: 'should handle very small ranges',
        input: { fromMs: 1000, toMs: 1500, stepMs: 1000 },
        expected: [{ name: '1970-01-01', y: 0 }],
      },
    ])(
      '$name',
      async ({ input, expected }) => {
        const result = await INIT_TIME_NUMBER_SERIE_FUNCTION({
          mFrom: mockDateTime(input.fromMs),
          mTo: mockDateTime(input.toMs),
          step: { milliseconds: input.stepMs },
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual(expected)
      }
    )
  }
)
