/**
 * initialize a `Highcharts`/`Highstock` `Array<[number, number]>` data for an optimized (boost) time serie
 * * provide DateTime and DurationObjectUnits -> import type { DateTime, DurationObjectUnits } from 'luxon'
 */
export const INIT_OPTI_TIME_NUMBER_SERIE_FUNCTION = async <DateTime = any, DurationObjectUnits = any> (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
}): Promise<Array<[number, number]>> => {
  const { mFrom, mTo, step } = _

  const pointList: Array<[number, number]> = []

  for (let mStep: any = mFrom; mStep <= mTo; mStep = mStep.plus(step)) {
    pointList.push([mStep.toMillis(), 0])
  }

  return pointList
}
