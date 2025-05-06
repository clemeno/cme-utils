import { TO_STRING } from '../convert/to-string.util.js'

/** `string` to uppercase for the first character */
export const STRING_UCF = (input: string): string => `${TO_STRING(input[0]).toUpperCase()}${input.slice(1)}`
