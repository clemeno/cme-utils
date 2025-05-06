import type { DateTime, DurationObjectUnits } from 'luxon'

/** initialize a `Highcharts`/`Highstock` `Array<[number, number | null]>` data for an optimized (boost) time serie */
export const INIT_OPTI_TIME_NUMBER_AVG_SERIE_FUNCTION = async (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
}): Promise<Array<[number, number | null]>> => {
  const { mFrom, mTo, step } = _

  const pointList: Array<[number, number | null]> = []

  let mStep = mFrom

  while (mStep <= mTo) {
    pointList.push([mStep.toMillis(), null])
    mStep = mStep.plus(step)
  }

  return pointList
}
