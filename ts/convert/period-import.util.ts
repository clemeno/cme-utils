import { IS_ON } from '../check/is-on.util.js'

/**
 * Parses a period string written by PERIOD_EXPORT back into `{ min, max, label }`.
 * A bound that luxon cannot parse as a valid DateTime stays the raw string.
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The luxon class and the serialised period
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.input - The `min_§§_max_§§_label` string
 * @returns The period, with `min` and `max` as DateTime (or raw string when invalid) and the label
 * @example
 * ```typescript
 * const DateTime = { fromISO: (iso: string) => ({ isValid: !iso.startsWith('invalid'), iso }) }
 * PERIOD_IMPORT({ DateTime, input: '2024-01-01_§§_2024-12-31_§§_year' }) // returns { min: { isValid: true, iso: '2024-01-01' }, max: { isValid: true, iso: '2024-12-31' }, label: 'year' }
 * PERIOD_IMPORT({ DateTime, input: 'invalidMin_§§_2024-12-31_§§_year' }) // returns { min: 'invalidMin', max: { isValid: true, iso: '2024-12-31' }, label: 'year' }
 * ```
 */
export function PERIOD_IMPORT<TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  input: string
}): { min: any, max: any, label: string } {
  const [minIso, maxIso, label] = _.input.split('_§§_')

  const { fromISO } = _.DateTime as any

  const mMin = fromISO(minIso)
  const mMax = fromISO(maxIso)

  return { min: IS_ON(mMin.isValid) ? mMin : minIso, max: IS_ON(mMax.isValid) ? mMax : maxIso, label }
}
