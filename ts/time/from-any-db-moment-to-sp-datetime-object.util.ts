import { DateTime } from 'luxon'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_NUMERIC_AND_SAFE } from '../check/is-numeric-and-safe.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { AppSpDate } from './app-sp-date.js'
import { NULL_DATE } from './null-date.util.js'

export const FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT = (_: { from: any, dbTz: string }): AppSpDate | null => {
  let res: AppSpDate | null = null

  let m: DateTime | null = DateTime.invalid('i')

  const from = _.from
  const dbTz = _.dbTz

  if (from === NULL_DATE) {
    m = null
  } else if (from instanceof DateTime) {
    m = from.setZone(dbTz)
  } else if (from instanceof Date || IS_NUMERIC_AND_SAFE(from)) {
    m = DateTime.fromMillis(+from, { zone: dbTz })
  } else if (IS_A_STRING_AND_NOT_EMPTY(from)) {
    m = DateTime.fromISO(from).setZone(dbTz)

    if (!m.isValid) {
      m = DateTime.fromSQL(from, { zone: dbTz })
    }
  }

  if (IS_SET(m)) {
    res = {
      date: TO_STRING(m.toSQL({ includeOffset: false })),
      timezone_type: 3,
      timezone: m.zoneName ?? dbTz,
    }
  }

  return res
}
