/**
 * No operation function: ignores its arguments.
 * @returns Nothing (undefined)
 * @example
 * ```typescript
 * NOOP() // returns undefined
 * NOOP(1, 'a', null) // returns undefined
 * ```
 */
export const NOOP: (..._: any) => void = () => {}
