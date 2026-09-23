import { describe, expect, it } from 'bun:test'
import { INIT_TIME_NUMBER_AVG_SERIE_FUNCTION } from '../../ts/chart/init-time-number-avg-serie-function.util.js'
import { mockDateTime, type DurationObjectUnits } from '../mocks/luxon-mock.js'

describe(
  'INIT_TIME_NUMBER_AVG_SERIE_FUNCTION',
  () => {
    it.each<{ name: string, from: number, to: number, step: DurationObjectUnits, toTz: string, toFormat: string, expected: Array<{ name: string, y: null }> }>([
      { name: 'create an array of objects with formatted names and null y values for a single step', from: 1000, to: 1000, step: { milliseconds: 1000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '1970-01-01', y: null }] },
      // 1970-01-01T00:00:01.000Z → 1970-01-01T00:00:03.000Z
      { name: 'create multiple points for a range with steps', from: 1000, to: 3000, step: { milliseconds: 1000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '1970-01-01', y: null }, { name: '1970-01-01', y: null }, { name: '1970-01-01', y: null }] },
      { name: 'handle empty range (mFrom > mTo)', from: 3000, to: 1000, step: { milliseconds: 1000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [] },
      { name: 'handle large step sizes', from: 1000, to: 2000, step: { milliseconds: 2000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '1970-01-01', y: null }] },
      // 2022-01-01T00:00:00.000Z → 2022-01-02T00:00:00.000Z, 1 day step
      { name: 'create one point per day over a two-day range', from: 1640995200000, to: 1641081600000, step: { milliseconds: 86400000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '2022-01-01', y: null }, { name: '2022-01-02', y: null }] },
      { name: 'work with different timezone and format', from: 1640995200000, to: 1641081600000, step: { days: 1 }, toTz: 'Europe/Paris', toFormat: 'dd/MM/yyyy', expected: [{ name: '01/01/2022', y: null }, { name: '02/01/2022', y: null }] },
      { name: 'handle exact boundary match', from: 2000, to: 2000, step: { milliseconds: 500 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '1970-01-01', y: null }] },
      { name: 'handle very small ranges', from: 1000, to: 1500, step: { milliseconds: 1000 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd', expected: [{ name: '1970-01-01', y: null }] },
    ])(
      'should $name',
      async ({ from, to, step, toTz, toFormat, expected }) => {
        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom: mockDateTime(from),
          mTo: mockDateTime(to),
          step,
          toTz,
          toFormat,
        })

        expect(result).toEqual(expected)
      }
    )
  }
)
