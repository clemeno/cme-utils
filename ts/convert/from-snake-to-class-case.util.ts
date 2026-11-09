/**
 * Converts a snake_case or UPPER_SNAKE_CASE name into a PascalCase class name.
 * @param s - The snake_case name
 * @returns The PascalCase name
 * @example
 * ```typescript
 * FROM_SNAKE_TO_CLASS_CASE('my_variable_name') // returns 'MyVariableName'
 * FROM_SNAKE_TO_CLASS_CASE('MY_CONST') // returns 'MyConst'
 * FROM_SNAKE_TO_CLASS_CASE('') // returns ''
 * ```
 */
export function FROM_SNAKE_TO_CLASS_CASE (s: string): string {
  return s.split('_').map(subS => `${subS[0]?.toUpperCase() ?? ''}${subS.slice(1).toLowerCase()}`).join('')
}
