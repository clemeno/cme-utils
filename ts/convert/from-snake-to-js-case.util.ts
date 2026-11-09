import { FROM_SNAKE_TO_CAMEL_CASE } from './from-snake-to-camel-case.util.js'

/**
 * Converts a snake_case name into a camelCase JS name, keeping a leading underscore.
 * @param s - The snake_case name
 * @returns The camelCase name, prefixed with `_` when the input starts with `_`
 * @example
 * ```typescript
 * FROM_SNAKE_TO_JS_CASE('my_variable_name') // returns 'myVariableName'
 * FROM_SNAKE_TO_JS_CASE('_my_private_name') // returns '_myPrivateName'
 * FROM_SNAKE_TO_JS_CASE('') // returns ''
 * ```
 */
export function FROM_SNAKE_TO_JS_CASE (s: string): string {
  const bUnderscoreStart = '_' === s[0]
  const camelS = FROM_SNAKE_TO_CAMEL_CASE(s)
  return bUnderscoreStart ? `_${camelS[0]?.toLowerCase() ?? ''}${camelS.slice(1)}` : camelS
}
