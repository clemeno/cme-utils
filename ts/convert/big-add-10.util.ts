import type { numeric } from '../numeric.js'

export const BIG_ADD_10 = (_: { x: numeric, y: numeric }): string => {
  let c = 0
  const r: number[] = []
  const x = `${_.x}`.split('').map(Number)
  const y = `${_.y}`.split('').map(Number)

  while ((x.length !== 0) || (y.length !== 0)) {
    const s = (x.pop() ?? 0) + (y.pop() ?? 0) + c

    const bSDecDigit = s < 10

    r.unshift(bSDecDigit ? s : s - 10)

    c = bSDecDigit ? 0 : 1
  }

  if (c !== 0) {
    r.unshift(c)
  }

  return r.join('')
}
