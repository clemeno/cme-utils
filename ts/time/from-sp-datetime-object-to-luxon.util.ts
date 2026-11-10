import { IS_SET } from '../check/is-set.util.js'
import type { AppSpDate } from './app-sp-date.js'

/**
 * Converts an `AppSpDate` into a luxon `DateTime` in the timezone of the `AppSpDate`.
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.spDate - The `AppSpDate` to convert
 * @returns The luxon `DateTime`, invalid (`isValid` is false) when `spDate` is not set or cannot be parsed
 * @example
 * ```typescript
 * const spDate: AppSpDate = { date: '2024-03-15 14:30:45.000', timezone_type: 3, timezone: 'UTC' }
 * FROM_SP_DATETIME_OBJECT_TO_LUXON({ DateTime, spDate }).toISO() // returns '2024-03-15T14:30:45.000Z'
 * FROM_SP_DATETIME_OBJECT_TO_LUXON({ DateTime, spDate: null }).isValid // returns false
 * ```
 */
export function FROM_SP_DATETIME_OBJECT_TO_LUXON<TypeofDateTime = any, DateTime = any> (_: {
  DateTime: TypeofDateTime
  spDate: AppSpDate | null | undefined
}): DateTime {
  const { fromSQL, invalid } = _.DateTime as any
  return IS_SET(_.spDate) ? fromSQL(_.spDate.date, { zone: _.spDate.timezone }) : invalid('i')
}
