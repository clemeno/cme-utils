import { IS_NOT_EMPTY } from './is-not-empty.util.js'

export const IS_EMPTY = (v: any): boolean => !IS_NOT_EMPTY(v)
