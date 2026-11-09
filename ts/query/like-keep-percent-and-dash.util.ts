/**
 * Escapes `%` and `_` (and the escape character itself) in a value, so that a SQL `like` matches them literally
 * @param _ - The value and the escape character
 * @param _.from - The value to escape
 * @param _.escapeWith - The escape character (defaults to a backslash)
 * @returns The escaped value
 * @example
 * ```typescript
 * LIKE_KEEP_PERCENT_AND_DASH({ from: '100%_done' }) // returns '100\\%\\_done'
 * LIKE_KEEP_PERCENT_AND_DASH({ from: 'a%b_c', escapeWith: '!' }) // returns 'a!%b!_c'
 * LIKE_KEEP_PERCENT_AND_DASH({ from: 'a\\b' }) // returns 'a\\\\b'
 * LIKE_KEEP_PERCENT_AND_DASH({ from: '' }) // returns ''
 * ```
 */
export function LIKE_KEEP_PERCENT_AND_DASH (_: { from: string, escapeWith?: string }): string {
  const esc = _.escapeWith ?? '\\'

  return `${_.from}`.split(esc).join(`${esc}${esc}`).replace(/%/g, `${esc}%`).replace(/_/g, `${esc}_`)
}
