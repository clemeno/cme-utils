import { TO_STRING } from '../convert/to-string.util.js'
import type { hashFnType } from '../hash-fn-type.js'

/**
 * Hashes a clear password through the provided hash function (e.g. `hash` of bcrypt).
 * The clear value is converted with `TO_STRING` first.
 * @param _ - The parameter object
 * @param _.clear - The clear password (converted to a string)
 * @param _.hashFn - The async function `(clear, iterationCount) => Promise<string>`
 * @param _.iterations - The iteration count given to `hashFn`, 12 by default
 * @returns A promise of the hash returned by the hash function
 * @example
 * ```typescript
 * const hashFn = async (clear: string, iterationCount: number) => `${clear}#${iterationCount}`
 * await ENCRYPT_PASSWORD({ clear: 'secret', hashFn }) // returns 'secret#12'
 * await ENCRYPT_PASSWORD({ clear: 'secret', hashFn, iterations: 4 }) // returns 'secret#4'
 * // null becomes an empty string
 * await ENCRYPT_PASSWORD({ clear: null, hashFn, iterations: 4 }) // returns '#4'
 * ```
 */
export async function ENCRYPT_PASSWORD (_: {
  clear: any
  hashFn: hashFnType
  iterations?: number
}): Promise<string> {
  const res = await _.hashFn(TO_STRING(_.clear), _.iterations ?? 12)
  return res
}
