/** current unix timestamp in seconds `+Date/1e3` */
export const NOW_UNIX = (): number => Math.trunc(+(new Date()) / 1e3)
