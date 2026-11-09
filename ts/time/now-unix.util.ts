/** current unix timestamp in seconds `+Date/1e3` */
export function NOW_UNIX (): number {
  return Math.trunc(+(new Date()) / 1e3)
}
