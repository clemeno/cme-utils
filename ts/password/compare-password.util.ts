import { TO_STRING } from '../convert/to-string.util.js'
import type { compareFnType } from '../compare-fn-type.js'

/**
 * Compares a clear password with a hash through the provided compare function (e.g. `compare` of bcrypt).
 * The clear value is converted with `TO_STRING` first.
 * @param _ - The parameter object
 * @param _.clear - The clear password (converted to a string)
 * @param _.hash - The stored hash to compare with
 * @param _.compareFn - The async function `(clear, hash) => Promise<boolean>`
 * @returns A promise of what the compare function returns: true when the password matches the hash
 * @example
 * ```typescript
 * const compareFn = async (clear: string, hash: string) => clear === hash
 * await COMPARE_PASSWORD({ clear: 'secret', hash: 'secret', compareFn }) // returns true
 * await COMPARE_PASSWORD({ clear: 'secret', hash: 'other', compareFn }) // returns false
 * // a number is converted to a string first
 * await COMPARE_PASSWORD({ clear: 12, hash: '12', compareFn }) // returns true
 * ```
 */
export async function COMPARE_PASSWORD (_: {
  clear: any
  hash: string
  compareFn: compareFnType
}): Promise<boolean> {
  const res = await _.compareFn(TO_STRING(_.clear), _.hash)
  return res
}
