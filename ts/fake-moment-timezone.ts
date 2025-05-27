import { IS_ON } from './check/is-on.util.js'
import { IS_A_DATE_AND_NOT_EMPTY } from './check/is-a-date-and-not-empty.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from './check/is-a-string-and-not-empty.util.js'
import { IS_NUMERIC } from './check/is-numeric.util.js'
import { TO_NUMBER } from './convert/to-number.util.js'

/**
 * `Luxon` `DateTime` `MomentTimezone` mock class for old versions of `Highcharts` (before 11.3)
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @use `const moment: any = new FakeMomentTimezone()`
 * @description Highcharts < 11.3 config.  `time: { timezone, moment }`
 * @see https://github.com/highcharts/highcharts/issues/8082
 * @see https://github.com/highcharts/highcharts/issues/8082#issuecomment-1239143982
 */
export class FakeMomentTimezone <DateTime = any, TypeofDateTime = any> {
  DateTime: TypeofDateTime

  _: DateTime

  constructor (_: { DateTime: TypeofDateTime }) {
    this.DateTime = _.DateTime

    const { now } = this.DateTime as any

    this._ = now()
  }

  // eslint-disable-next-line max-params
  tz (timestampMs?: number | Date, tz?: string): this {
    const _ms = IS_A_DATE_AND_NOT_EMPTY(timestampMs) ? +timestampMs : TO_NUMBER(timestampMs)

    const _options = IS_A_STRING_AND_NOT_EMPTY(tz) ? { zone: tz } : undefined

    const { fromMillis, now } = this.DateTime as any

    const m = IS_NUMERIC(_ms) ? fromMillis(_ms, _options) : now()

    this._ = IS_ON(m.isValid) ? m : now()

    return this
  }

  utcOffset (): number {
    const { offset } = this._ as any

    return TO_NUMBER(offset)
  }
}
