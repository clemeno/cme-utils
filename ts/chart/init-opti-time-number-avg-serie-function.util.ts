import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * initialize a `Highcharts`/`Highstock` `Array<[number, number | null]>` data for an optimized (boost) time serie
 * * provide DateTime and DurationObjectUnits -> import { DateTime, type DurationObjectUnits } from 'luxon'
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
