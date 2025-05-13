import { DateTime } from 'luxon'
import { IS_SET } from '../check/is-set.util.js'
import type { AppSpDate } from './app-sp-date.js'

export const FROM_SP_DATETIME_OBJECT_TO_LUXON = (spd: AppSpDate): DateTime => {
  return IS_SET(spd) ? DateTime.fromSQL(spd.date, { zone: spd.timezone }) : DateTime.invalid('i')
}
