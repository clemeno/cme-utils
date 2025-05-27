/**
 * `Luxon` `DateTime` both occured during the same year
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME_Y = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => (_.ma as any).year === (_.mb as any).year
