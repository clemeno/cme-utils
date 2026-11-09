import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * initialize a `Highcharts`/`Highstock` `PointOptionsObject[]` data for a time serie
 * * provide DateTime and DurationObjectUnits -> import { DateTime, type DurationObjectUnits } from 'luxon'
 * @param _ - The parameter object
 * @param _.mFrom - The luxon DateTime of the first point
 * @param _.mTo - The luxon DateTime of the last possible point (inclusive)
 * @param _.step - The luxon duration between two points
 * @param _.toTz - The time zone used to format the point names
 * @param _.toFormat - The luxon format of the point names
 * @returns A promise of `{ name, y: null }` points, one per step from `mFrom` to `mTo` (empty when `mFrom` is after `mTo`)
 * @example
 * ```typescript
 * const mFrom = DateTime.fromISO('2022-01-01T00:00:00Z')
 * const mTo = DateTime.fromISO('2022-01-02T00:00:00Z')
 * await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({ mFrom, mTo, step: { days: 1 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd' }) // returns [{ name: '2022-01-01', y: null }, { name: '2022-01-02', y: null }]
 * // mFrom after mTo gives no point
 * await INIT_TIME_NUMBER_AVG_SERIE_FUNCTION({ mFrom: mTo, mTo: mFrom, step: { days: 1 }, toTz: 'UTC', toFormat: 'yyyy-MM-dd' }) // returns []
 * ```
 */
export async function INIT_TIME_NUMBER_AVG_SERIE_FUNCTION<DateTime = any, DurationObjectUnits = any> (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
  toTz: string
  toFormat: string
}): Promise<any[]> {
  const { mFrom, mTo, step } = _

  const pointList: any[] = []

  for (let mStep: any = mFrom; TO_NUMBER(mStep) <= TO_NUMBER(mTo); mStep = mStep.plus(step)) {
    pointList.push({ name: mStep.setZone(_.toTz).toFormat(_.toFormat), y: null })
  }

  return pointList
}
