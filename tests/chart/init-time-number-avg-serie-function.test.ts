import { describe, expect, it } from 'bun:test'
import { INIT_TIME_NUMBER_AVG_SERIE_FUNCTION } from '../../ts/chart/init-time-number-avg-serie-function.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'INIT_TIME_NUMBER_AVG_SERIE_FUNCTION',
  () => {
    it(
      'should create an array of objects with formatted names and null y values for a single step',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(1000)
        const step = { milliseconds: 1000 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([{ name: '1970-01-01', y: null }])
      }
    )

    it(
      'should create multiple points for a range with steps',
      async () => {
        const mFrom = mockDateTime(1000) // 1970-01-01T00:00:01.000Z
        const mTo = mockDateTime(3000)   // 1970-01-01T00:00:03.000Z
        const step = { milliseconds: 1000 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([
          { name: '1970-01-01', y: null },
          { name: '1970-01-01', y: null },
          { name: '1970-01-01', y: null },
        ])
      }
    )

    it(
      'should handle empty range (mFrom > mTo)',
      async () => {
        const mFrom = mockDateTime(3000)
        const mTo = mockDateTime(1000)
        const step = { milliseconds: 1000 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([])
      }
    )

    it(
      'should handle large step sizes',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(2000)
        const step = { milliseconds: 2000 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([{ name: '1970-01-01', y: null }])
      }
    )

    it(
      'should work with different timezone and format',
      async () => {
        const mFrom = mockDateTime(1640995200000) // 2022-01-01T00:00:00.000Z
        const mTo = mockDateTime(1641081600000)   // 2022-01-02T00:00:00.000Z
        const step = { milliseconds: 86400000 } // 1 day

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([
          { name: '2022-01-01', y: null },
          { name: '2022-01-02', y: null },
        ])
      }
    )

    it(
      'should handle exact boundary match',
      async () => {
        const mFrom = mockDateTime(2000)
        const mTo = mockDateTime(2000)
        const step = { milliseconds: 500 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([{ name: '1970-01-01', y: null }])
      }
    )

    it(
      'should handle very small ranges',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(1500)
        const step = { milliseconds: 1000 }

        const result = await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
          toTz: 'UTC',
          toFormat: 'yyyy-MM-dd',
        })

        expect(result).toEqual([{ name: '1970-01-01', y: null }])
      }
    )
  }
)
