import type { DateTime } from 'luxon'
import { IS_ON } from '../check/is-on.util.js'

export const PERIOD_IMPORT = (_: { input: string, DateTime: typeof DateTime }): { min: any, max: any, label: string } => {
  const [minIso, maxIso, label] = _.input.split('_§§_')

  const mMin = _.DateTime.fromISO(minIso)
  const mMax = _.DateTime.fromISO(maxIso)

  return { min: IS_ON(mMin.isValid) ? mMin : minIso, max: IS_ON(mMax.isValid) ? mMax : maxIso, label }
}
