/**
 * initialize a `Highcharts`/`Highstock` `PointOptionsObject[]` data for a time serie
 * * provide DateTime and DurationObjectUnits -> import type { DateTime, DurationObjectUnits } from 'luxon'
 */
export const INIT_TIME_NUMBER_SERIE_FUNCTION = async <DateTime = any, DurationObjectUnits = any> (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
  toTz: string
  toFormat: string
}): Promise<any[]> => {
  const { mFrom, mTo, step } = _

  const pointList: any[] = []

  for (let mStep: any = mFrom; mStep <= mTo; mStep = mStep.plus(step)) {
    pointList.push({ name: mStep.setZone(_.toTz).toFormat(_.toFormat), y: 0 })
  }

  return pointList
}
