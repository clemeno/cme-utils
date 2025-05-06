import { TO_STRING } from '../convert/to-string.util.js'

/** `string` to lowercase for the first character */
export const STRING_LCF = (input: string): string => `${TO_STRING(input[0]).toLowerCase()}${input.slice(1)}`
