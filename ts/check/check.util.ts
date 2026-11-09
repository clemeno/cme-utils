/**
 * CHECK (is `that` `true` ? Return `that` value in any case, except if we have to `throw` a given `Error` if `that` is `false`)
 * @deprecated Use the `if (!that) { throw Error }` syntax instead so that TypeScript interpret the `if` statement as a real `Guard`
 * @param _ - The check parameters
 * @param _.that - The condition to check
 * @param _.orThrow - The error to throw when `that` is `false` (nothing is thrown when it is `null` or `undefined`)
 * @returns The `that` value, when it is `true` or when there is no `orThrow` to throw
 * @example
 * ```typescript
 * CHECK({ that: true }) // returns true
 * CHECK({ that: false }) // returns false
 * CHECK({ that: false, orThrow: new Error('nope') }) // throws nope
 * ```
 */
export function CHECK (_: { that: boolean, orThrow?: any }): boolean {
  if ((typeof _.orThrow !== 'undefined') && (_.orThrow !== null) && !_.that) {
    throw _.orThrow
  }

  return _.that
}
