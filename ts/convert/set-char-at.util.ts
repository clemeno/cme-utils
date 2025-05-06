export const SET_CHAR_AT = (_: { input: string, at: number, set: string }): string => {
  return `${_.input.slice(0, _.at)}${_.set}${_.input.slice(_.at + _.set.length)}`
}
