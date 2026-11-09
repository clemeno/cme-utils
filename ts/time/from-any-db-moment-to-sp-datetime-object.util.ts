import { IS_ON } from '../check/is-on.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { IS_NUMERIC_AND_SAFE } from '../number/is-numeric-and-safe.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { AppSpDate } from './app-sp-date.js'
import { NULL_DATE } from './null-date.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Converts a database moment (`DateTime`, `Date`, timestamp in ms, ISO or SQL string) into an `AppSpDate` in the database timezone.
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.from - The moment to convert
 * @param _.dbTz - The IANA timezone of the database (e.g. 'UTC')
 * @returns The `AppSpDate`, or `null` when `from` is the null date '0000-01-01 00:00:00' or cannot be parsed
 * @example
 * ```typescript
 * FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({ DateTime, from: '2024-03-15 14:30:45', dbTz: 'UTC' }) // returns { date: '2024-03-15 14:30:45.000', timezone_type: 3, timezone: 'UTC' }
 * FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({ DateTime, from: '0000-01-01 00:00:00', dbTz: 'UTC' }) // returns null
 * FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({ DateTime, from: 'not a date', dbTz: 'UTC' }) // returns null
 * ```
 */
export function FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT<TypeofDateTime = any, DateTime = any> (_: {
  DateTime: TypeofDateTime
  from: any
  dbTz: string
}): AppSpDate | null {
  let res: AppSpDate | null = null

  const DateTimeClass = _.DateTime as any
  const { invalid, fromMillis, fromISO, fromSQL } = DateTimeClass

  let m: DateTime | null = invalid('i')

  const from = _.from
  const dbTz = _.dbTz

  if (from === NULL_DATE) {
    m = null
  } else if (from instanceof DateTimeClass) {
    m = from.setZone(dbTz)
  } else if (from instanceof Date || IS_NUMERIC_AND_SAFE(from)) {
    m = fromMillis(TO_NUMBER(from), { zone: dbTz })
  } else if (IS_A_STRING_AND_NOT_EMPTY(from)) {
    m = fromISO(from).setZone(dbTz)

    if (!IS_ON((m as any)?.isValid)) {
      m = fromSQL(from, { zone: dbTz })
    }
  }

  // Luxon's invalid() and failed parses return a DateTime with isValid false, not null
  if (IS_SET(m) && IS_ON((m as any).isValid)) {
    res = {
      date: TO_STRING((m as any).toSQL({ includeOffset: false })),
      timezone_type: 3,
      timezone: (m as any).zoneName ?? dbTz,
    }
  }

  return res
}
