import { IS_A_DATE_AND_NOT_EMPTY, IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC, IS_ON } from 'check/check.util.js'
import { TO_NUMBER } from 'convert/convert.util.js'

/**
 * `Luxon` `DateTime` `MomentTimezone` mock class for old versions of `Highcharts` (before 11.3)
 * @use `const moment: any = new FakeMomentTimezone()`
 * @description Highcharts < 11.3 config.  `time: { timezone, moment }`
 * @see https://github.com/highcharts/highcharts/issues/8082
 * @see https://github.com/highcharts/highcharts/issues/8082#issuecomment-1239143982
 */
export class FakeMomentTimezone <T = any> {
  DateTime: T

  _: T

  constructor (_: {
    /** @type {Luxon.DateTime} */
    DateTime: T
  }) {
    this.DateTime = _.DateTime
    this._ = (this.DateTime as any).now()
  }

  // eslint-disable-next-line max-params
  tz (timestampMs?: number | Date, tz?: string): this {
    const _ms = IS_A_DATE_AND_NOT_EMPTY(timestampMs) ? +timestampMs : TO_NUMBER(timestampMs)

    const _options = IS_A_STRING_AND_NOT_EMPTY(tz) ? { zone: tz } : undefined

    const m = IS_NUMERIC(_ms) ? (this.DateTime as any).fromMillis(_ms, _options) : (this.DateTime as any).now()

    this._ = IS_ON(m.isValid) ? m : (this.DateTime as any).now()

    return this
  }

  utcOffset (): number {
    return (this._ as any).offset
  }
}
