export const IS_SET = <T> (v: T | null | undefined): v is T => (v !== null) && (typeof v !== 'undefined')
