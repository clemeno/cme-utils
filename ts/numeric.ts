/**
 * `string` representation of a numeric value or a `number`
 *
 * useful for user input or flexibility in the code to allow the storage of accurate big numbers without losing precision
 *
 * @description may be `NaN` or any `string`
 * @tip use IS_NUMERIC() to validate the representation of a valid number for any `numeric`
 */
export type numeric = string | number
