import { IS_UUID_STRING } from '../uuid/is-uuid-string.util.js'

/** @returns {boolean} `s` is a valid UUID? */
export function IS_UUID (s: string): boolean {
  return IS_UUID_STRING(s)
}
