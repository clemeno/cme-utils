/**
 * Converts a camelCase name into a lowercase snake_case name.
 * @param s - The camelCase name
 * @returns The snake_case name
 * @example
 * ```typescript
 * FROM_JS_TO_SNAKE_CASE('myVariableName') // returns 'my_variable_name'
 * FROM_JS_TO_SNAKE_CASE('already_snake') // returns 'already_snake'
 * FROM_JS_TO_SNAKE_CASE('') // returns ''
 * ```
 */
export function FROM_JS_TO_SNAKE_CASE (s: string): string {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}
