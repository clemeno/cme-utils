/**
 * current SQL `datetime` `UTC` - **without** timzeone display
 */
export const MYSQL_DATETIME_NOW_UTC = (): string => {
  return (new Date()).toISOString().split('.')[0].replace('T', ' ')
}
