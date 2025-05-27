import { IS_ON } from '../check/is-on.util.js'

/**
 * * provide DateTime -> import { DateTime } from 'luxon'
 */
export const PERIOD_IMPORT = <TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  input: string
}): { min: any, max: any, label: string } => {
  const [minIso, maxIso, label] = _.input.split('_§§_')

  const { fromISO } = _.DateTime as any

  const mMin = fromISO(minIso)
  const mMax = fromISO(maxIso)

  return { min: IS_ON(mMin.isValid) ? mMin : minIso, max: IS_ON(mMax.isValid) ? mMax : maxIso, label }
}
