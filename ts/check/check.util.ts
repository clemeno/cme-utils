/**
 * CHECK (is `that` `true` ? Return `that` value in any case, except if we have to `throw` a given `Error` if `that` is `false`)
 * @deprecated Use the `if (!that) { throw Error }` syntax instead so that TypeScript interpret the `if` statement as a real `Guard`
 */
export const CHECK = (_: { that: boolean, orThrow?: any }): boolean => {
  if ((typeof _.orThrow !== 'undefined') && (_.orThrow !== null) && !_.that) {
    throw _.orThrow
  }

  return _.that
}
