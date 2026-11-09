import { IS_SET } from '../check/is-set.util.js'

/**
 * Serializes a value into a JSON string, without ever throwing.
 * @param v - The value to serialize
 * @returns The JSON string, or an empty string for null, undefined, a function or a value JSON cannot serialize (circular)
 * @example
 * ```typescript
 * TO_JSON({ a: 1 }) // returns '{"a":1}'
 * TO_JSON('a') // returns '"a"'
 * TO_JSON(null) // returns ''
 * TO_JSON(undefined) // returns ''
 * ```
 */
export function TO_JSON (v: unknown): string {
  let res: string = ''

  if (IS_SET(v)) {
    try {
      const json = JSON.stringify(v)
      res = json !== undefined ? json : ''
    } catch { }
  }

  return res
}
