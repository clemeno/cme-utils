/**
 * Overwrites the characters of a string from a position with another string (as long as `set`).
 * @param _ - The string, the position and the replacement
 * @param _.input - The string to change
 * @param _.at - The position of the first replaced character
 * @param _.set - The replacement, which overwrites `set.length` characters
 * @returns The new string; a position past the end appends `set`
 * @example
 * ```typescript
 * SET_CHAR_AT({ input: 'abcdef', at: 2, set: 'X' }) // returns 'abXdef'
 * SET_CHAR_AT({ input: 'abcdef', at: 2, set: 'XYZ' }) // returns 'abXYZf'
 * SET_CHAR_AT({ input: 'abc', at: 5, set: 'X' }) // returns 'abcX'
 * SET_CHAR_AT({ input: '', at: 0, set: 'X' }) // returns 'X'
 * ```
 */
export function SET_CHAR_AT (_: { input: string, at: number, set: string }): string {
  return `${_.input.slice(0, _.at)}${_.set}${_.input.slice(_.at + _.set.length)}`
}
