import { TO_NUMBER } from '../convert/to-number.util.js'

/** current unix timestamp in seconds `+Date/1e3` */
export function NOW_UNIX (): number {
  return Math.trunc(TO_NUMBER(new Date()) / 1e3)
}
