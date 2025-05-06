import { IS_UUID_STRING } from '../uuid/is-uuid-string.util.js'

/** @returns {boolean} `s` is a valid UUID? */
export const IS_UUID = (s: string): boolean => IS_UUID_STRING(s)
