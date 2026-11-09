import { FROM_SNAKE_TO_CLASS_CASE } from './from-snake-to-class-case.util.js'

/**
 * Converts a snake_case or UPPER_SNAKE_CASE name into a camelCase name.
 * @param s - The snake_case name
 * @returns The camelCase name
 * @example
 * ```typescript
 * FROM_SNAKE_TO_CAMEL_CASE('my_variable_name') // returns 'myVariableName'
 * FROM_SNAKE_TO_CAMEL_CASE('MY_CONST') // returns 'myConst'
 * FROM_SNAKE_TO_CAMEL_CASE('') // returns ''
 * ```
 */
export function FROM_SNAKE_TO_CAMEL_CASE (s: string): string {
  const classS = FROM_SNAKE_TO_CLASS_CASE(s)
  return `${classS[0]?.toLowerCase() ?? ''}${classS.slice(1)}`
}
