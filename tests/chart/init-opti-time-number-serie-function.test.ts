import { describe, expect, it } from 'bun:test'
import { INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION } from '../../ts/chart/init-opti-time-number-serie-function.util.js'
import { mockDateTime } from '../mocks/luxon-mock.js'

describe(
  'INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION',
  () => {
    it(
      'should create an array of [timestamp, 0] pairs for a single step',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(1000)
        const step = { milliseconds: 1000 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([[1000, 0]])
      }
    )

    it(
      'should create multiple points for a range with steps',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(3000)
        const step = { milliseconds: 1000 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([
          [1000, 0],
          [2000, 0],
          [3000, 0],
        ])
      }
    )

    it(
      'should handle empty range (mFrom > mTo)',
      async () => {
        const mFrom = mockDateTime(3000)
        const mTo = mockDateTime(1000)
        const step = { milliseconds: 1000 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([])
      }
    )

    it(
      'should handle large step sizes',
      async () => {
        const mFrom = mockDateTime(100000)
        const mTo = mockDateTime(200000)
        const step = { milliseconds: 200000 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([[100000, 0]])
      }
    )

    it(
      'should work with different timestamp values',
      async () => {
        const mFrom = mockDateTime(1640995200000) // 2022-01-01
        const mTo = mockDateTime(1641081600000)   // 2022-01-02
        const step = { milliseconds: 86400000 } // 1 day

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([
          [1640995200000, 0],
          [1641081600000, 0],
        ])
      }
    )

    it(
      'should handle exact boundary match',
      async () => {
        const mFrom = mockDateTime(2000)
        const mTo = mockDateTime(2000)
        const step = { milliseconds: 500 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([[2000, 0]])
      }
    )

    it(
      'should handle very small ranges',
      async () => {
        const mFrom = mockDateTime(1000)
        const mTo = mockDateTime(1500)
        const step = { milliseconds: 1000 }

        const result = await INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION({
          mFrom,
          mTo,
          step,
        })

        expect(result).toEqual([[1000, 0]])
      }
    )
  }
)
