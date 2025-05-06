import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'

export const FROM_BASE_16_TO_CARD_SERIAL = (_: string): string => {
  let res = ''

  if (IS_A_STRING_AND_NOT_EMPTY(_)) {
    const s = `${_}`.padStart(16, '0')

    res = `${s.slice(-16, -8)} ${s.slice(-8)}`
  }

  return res
}
