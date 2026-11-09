import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * initialize a `Highcharts`/`Highstock` `Array<[number, number | null]>` data for an optimized (boost) time serie
 * * provide DateTime and DurationObjectUnits -> import { DateTime, type DurationObjectUnits } from 'luxon'
 * @param _ - The parameter object
 * @param _.mFrom - The luxon DateTime of the first point
 * @param _.mTo - The luxon DateTime of the last possible point (inclusive)
 * @param _.step - The luxon duration between two points
 * @returns A promise of `[timestamp in ms, null]` points, one per step from `mFrom` to `mTo` (empty when `mFrom` is after `mTo`)
 * @example
 * ```typescript
 * const mFrom = DateTime.fromISO('2022-01-01T00:00:00Z')
 * const mTo = DateTime.fromISO('2022-01-02T00:00:00Z')
 * await INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION({ mFrom, mTo, step: { days: 1 } }) // returns [[1640995200000, null], [1641081600000, null]]
 * // mFrom after mTo gives no point
 * await INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION({ mFrom: mTo, mTo: mFrom, step: { days: 1 } }) // returns []
 * ```
 */
export async function INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION<DateTime = any, DurationObjectUnits = any> (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
}): Promise<Array<[number, number | null]>> {
  const { mFrom, mTo, step } = _

  const pointList: Array<[number, number | null]> = []

  for (let mStep: any = mFrom; TO_NUMBER(mStep) <= TO_NUMBER(mTo); mStep = mStep.plus(step)) {
    pointList.push([TO_NUMBER(mStep), null])
  }

  return pointList
}
