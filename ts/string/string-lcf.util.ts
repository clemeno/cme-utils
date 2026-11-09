import { TO_STRING } from '../convert/to-string.util.js'

/** `string` to lowercase for the first character */
export function STRING_LCF (input: string): string {
  return `${TO_STRING(input[0]).toLowerCase()}${input.slice(1)}`
}
