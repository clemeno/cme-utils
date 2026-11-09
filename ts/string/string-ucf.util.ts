import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Uppercases the first character of a string.
 * @param input - The string to convert
 * @returns The string with its first character in uppercase
 * @example
 * ```typescript
 * STRING_UCF('hello') // returns 'Hello'
 * STRING_UCF('hello world') // returns 'Hello world'
 * STRING_UCF('') // returns ''
 * ```
 */
export function STRING_UCF (input: string): string {
  return `${TO_STRING(input[0]).toUpperCase()}${input.slice(1)}`
}
