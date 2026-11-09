import { IS_EMPTY } from '../check/is-empty.util.js'

export function TO_BOOLEAN (v: any): boolean {
  return (typeof v === 'boolean') ? v : !IS_EMPTY(v)
}
