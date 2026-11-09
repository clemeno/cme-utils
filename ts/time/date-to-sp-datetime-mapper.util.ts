import type { ObjectWithKeyValueType } from '../object-with-key-value-type.js'
import type { AppSpDate } from './app-sp-date.js'
import { FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT } from './from-any-db-moment-to-sp-datetime-object.util.js'

/**
 * Maps a list of objects, converting the `Date` found under one key into an `AppSpDate` (or `null`) with the database timezone.
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The mapper parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.at - The list of objects to map
 * @param _.key - The key of each object holding the moment to convert
 * @param _.dbTz - The IANA timezone of the database (e.g. 'UTC')
 * @returns A new list where `key` holds an `AppSpDate`, or `null` when the moment is empty or invalid
 * @example
 * ```typescript
 * const at = [{ id: 1, d: new Date('2024-03-15T14:30:45Z') }]
 * DATE_TO_SP_DATETIME_MAPPER({ DateTime, at, key: 'd', dbTz: 'UTC' }) // returns [{ id: 1, d: { date: '2024-03-15 14:30:45.000', timezone_type: 3, timezone: 'UTC' } }]
 * DATE_TO_SP_DATETIME_MAPPER({ DateTime, at: [], key: 'd', dbTz: 'UTC' }) // returns []
 * ```
 */
export function DATE_TO_SP_DATETIME_MAPPER<
  K extends string,
  T = ObjectWithKeyValueType<K, Date>, _T = Omit<T, K> & { [k in K]: AppSpDate },
  TypeofDateTime = any
> (_: {
  DateTime: TypeofDateTime
  at: Array<T>
  key: K
  dbTz: string
}): Array<_T> {
  return _.at.map((e: T) => {
    const { [_.key]: date, ...rest } = e

    const dbTz = _.dbTz

    return { ...rest, [_.key]: FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({ from: date, dbTz, DateTime: _.DateTime }) } as _T
  })
}
