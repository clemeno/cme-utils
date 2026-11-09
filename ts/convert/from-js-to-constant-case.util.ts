import { FROM_JS_TO_SNAKE_CASE } from './from-js-to-snake-case.util.js'

/**
 * Converts a camelCase name into an UPPER_SNAKE_CASE constant name.
 * @param s - The camelCase name
 * @returns The UPPER_SNAKE_CASE name
 * @example
 * ```typescript
 * FROM_JS_TO_CONSTANT_CASE('myVariableName') // returns 'MY_VARIABLE_NAME'
 * FROM_JS_TO_CONSTANT_CASE('') // returns ''
 * ```
 */
export function FROM_JS_TO_CONSTANT_CASE (s: string): string {
  return FROM_JS_TO_SNAKE_CASE(s).toUpperCase()
}
