/**
 * `Date` `toISOString`
 * @returns The current UTC moment as an ISO string ('YYYY-MM-DDTHH:mm:ss.sssZ')
 * @example
 * ```typescript
 * NOW_UTC_ISO().endsWith('Z') // returns true
 * NOW_UTC_ISO().length // returns 24
 * ```
 */
export function NOW_UTC_ISO (): string {
  return (new Date()).toISOString()
}
