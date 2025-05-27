import { IS_SET } from '../check/is-set.util.js'
import type { AppSpDate } from './app-sp-date.js'

/**
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const FROM_SP_DATETIME_OBJECT_TO_LUXON = <TypeofDateTime = any, DateTime = any> (_: {
  DateTime: TypeofDateTime
  spDate: AppSpDate
}): DateTime => {
  const { fromSQL, invalid } = _.DateTime as any
  return IS_SET(_.spDate) ? fromSQL(_.spDate.date, { zone: _.spDate.timezone }) : invalid('i')
}
