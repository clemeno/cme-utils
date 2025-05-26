import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { IS_ON } from '../check/is-on.util.js'

/**
 * The input value IS_ON or IS_NUMERIC then
 * @returns the input: identity, else '-': a dash to display
 */
export const OR_DASH = <T = any> (input: T): T | '-' => (IS_ON(input) || IS_NUMERIC(input)) ? input : '-'
