import { TO_NUMBER } from '../convert/to-number.util.js'

/** current timestamp in milliseconds `+Date` */
export function NOW_MS (): number {
  return TO_NUMBER(new Date())
}
