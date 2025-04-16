import { type numeric } from './numeric.js'

/**
 * A value representing a `boolean` concept across different types: `boolean`, `number`, or numeric `string`
 *
 * * useful for user input or flexibility in the code
 *
 * @tip use IS_BOOL() to validate the representation of a valid boolean for any `bool`
 * @tip use PARSE_BOOL(`bool`) to retrieve a strict `boolean` value
 * @example `PARSE_BOOL(true)` -> `true`
 * @example `PARSE_BOOL(1)` -> `true`
 * @example `PARSE_BOOL('1')` -> `true`
 * @example `PARSE_BOOL('true')` -> `true`
 * @example `PARSE_BOOL('yes')` -> `true`
 * @example `PARSE_BOOL('on')` -> `true`
 * @example `PARSE_BOOL('y')` -> `true`
 * @example `PARSE_BOOL('ok')` -> `true`
 * @example any other value represent the boolean `false`
 */
export type bool = boolean | numeric
