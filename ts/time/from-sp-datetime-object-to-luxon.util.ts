import type { DateTime } from 'luxon'
import { IS_SET } from '../check/is-set.util.js'
import type { AppSpDate } from './app-sp-date.js'

export const FROM_SP_DATETIME_OBJECT_TO_LUXON = (_: { spDate: AppSpDate, DateTime: typeof DateTime }): DateTime => {
  return IS_SET(_.spDate) ? _.DateTime.fromSQL(_.spDate.date, { zone: _.spDate.timezone }) : _.DateTime.invalid('i')
}
