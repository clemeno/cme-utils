import type { DateTime } from 'luxon'
import type { ObjectWithKeyValueType } from '../object-with-key-value-type.js'
import type { AppSpDate } from './app-sp-date.js'
import { FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT } from './from-any-db-moment-to-sp-datetime-object.util.js'

export const DATE_TO_SP_DATETIME_MAPPER = <K extends string, T = ObjectWithKeyValueType<K, Date>, _T = Omit<T, K> & { [k in K]: AppSpDate }> (_: {
  at: Array<T>
  key: K
  dbTz: string
  DateTime: typeof DateTime
}): Array<_T> => {
  return _.at.map((e: T) => {
    const { [_.key]: date, ...rest } = e

    const dbTz = _.dbTz

    return { ...rest, [_.key]: FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({ from: date, dbTz, DateTime: _.DateTime }) } as _T
  })
}
