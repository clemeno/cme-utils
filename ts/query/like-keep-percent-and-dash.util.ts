export const LIKE_KEEP_PERCENT_AND_DASH = (_: { from: string, escapeWith?: string }): string => {
  const esc = _.escapeWith ?? '\\'

  return `${_.from}`.split(esc).join(`${esc}${esc}`).replace(/%/g, `${esc}%`).replace(/_/g, `${esc}_`)
}
