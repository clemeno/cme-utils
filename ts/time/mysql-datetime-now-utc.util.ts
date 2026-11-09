/**
 * current SQL `datetime` `UTC` - **without** timzeone display
 * @returns The current UTC time as 'YYYY-MM-DD HH:mm:ss'
 * @example
 * ```typescript
 * MYSQL_DATETIME_NOW_UTC().length // returns 19
 * MYSQL_DATETIME_NOW_UTC().includes('T') // returns false
 * // the current UTC time as 'YYYY-MM-DD HH:mm:ss'
 * MYSQL_DATETIME_NOW_UTC()
 * ```
 */
export function MYSQL_DATETIME_NOW_UTC (): string {
  return (new Date()).toISOString().split('.')[0].replace('T', ' ')
}
