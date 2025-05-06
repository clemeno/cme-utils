import type { bool } from '../bool.js'

export const IS_BOOL = (v: any): v is bool => {
  let res = (v === true) || (v === false)

  if ((
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
  )) {
    res = (+v === 0) || (+v === 1)
  } else if (typeof v === 'string') {
    const vl = v.toLowerCase()
    res = (
      (vl === '1') ||
      (vl === '0') ||
      (vl === 'true') ||
      (vl === 'false') ||
      (vl === 'yes') ||
      (vl === 'no') ||
      (vl === 'on') ||
      (vl === 'off') ||
      (vl === 'y') ||
      (vl === 'n') ||
      (vl === 'ok') ||
      (vl === 'ko')
    )
  }

  return res
}
