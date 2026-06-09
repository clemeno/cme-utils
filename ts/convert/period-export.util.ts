import { TO_STRING } from './to-string.util.js'

type DateLike = { toISO: () => string | null } | { toISOString: () => string }

const toIsoString = (value: DateLike | null | undefined): string | null | undefined => {
  return value == null ? undefined : (('toISO' in value) ? value.toISO() : value.toISOString())
}

/**
 * Serialises a period (min, max, label) into a `_§§_` delimited string.
 * Supports both JS `Date` (via `toISOString()`) and Luxon `DateTime` (via `toISO()`).
 *
 * @param _ - Object with `min`, `max` (date-like or null) and `label` string
 * @returns Serialised period string in `min_§§_max_§§_label` format
 * @example
 * PERIOD_EXPORT({ min: new Date('2024-01-01T00:00:00.000Z'), max: new Date('2024-12-31T00:00:00.000Z'), label: 'year' })
 * // '2024-01-01T00:00:00.000Z_§§_2024-12-31T00:00:00.000Z_§§_year'
 */
export const PERIOD_EXPORT = (_: { min: DateLike | null | undefined, max: DateLike | null | undefined, label: string }): string => {
  return `${TO_STRING(toIsoString(_.min))}_§§_${TO_STRING(toIsoString(_.max))}_§§_${_.label}`
}
