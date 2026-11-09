import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Lowercases the first character of a string.
 * @param input - The string to convert
 * @returns The string with its first character in lowercase
 * @example
 * ```typescript
 * STRING_LCF('Hello') // returns 'hello'
 * STRING_LCF('HELLO') // returns 'hELLO'
 * STRING_LCF('') // returns ''
 * ```
 */
export function STRING_LCF (input: string): string {
  return `${TO_STRING(input[0]).toLowerCase()}${input.slice(1)}`
}
