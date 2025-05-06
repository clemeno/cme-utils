import type { DateTime, DurationObjectUnits } from 'luxon'

/** initialize a `Highcharts`/`Highstock` `PointOptionsObject[]` data for a time serie */
export const INIT_TIME_NUMBER_AVG_SERIE_FUNCTION = async (_: {
  mFrom: DateTime
  mTo: DateTime
  step: DurationObjectUnits
  toTz: string
  toFormat: string
}): Promise<any[]> => {
  const { mFrom, mTo, step } = _

  const pointList: any[] = []

  let mStep = mFrom

  while (mStep <= mTo) {
    pointList.push({ name: mStep.setZone(_.toTz).toFormat(_.toFormat), y: null })
    mStep = mStep.plus(step)
  }

  return pointList
}
