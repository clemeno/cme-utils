/**
 * initialize a `Highcharts`/`Highstock` `Array<[number, number | null]>` data for an optimized (boost) time serie
 * * provide DateTime and DurationObjectUnits -> import type { DateTime, DurationObjectUnits } from 'luxon'
 */
export const INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION = async <DateTime = any, DurationObjectUnits = any> (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
}): Promise<Array<[number, number | null]>> => {
  const { mFrom, mTo, step } = _

  const pointList: Array<[number, number | null]> = []

  for (let mStep: any = mFrom; mStep <= mTo; mStep = mStep.plus(step)) {
    pointList.push([mStep.toMillis(), null])
  }

  return pointList
}
