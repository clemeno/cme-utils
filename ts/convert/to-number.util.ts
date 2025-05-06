export const TO_NUMBER = (v: any): number => {
  let res = NaN

  if (typeof v === 'number') {
    res = v
  } else if (typeof v === 'boolean') {
    res = v ? 1 : 0
  } else if (typeof v === 'string') {
    const a = Number(v)
    const b = Number.parseFloat(v)

    res = (a === b) ? a : NaN
  } else if ((typeof v !== 'undefined') && (v !== null) && (typeof v.valueOf === 'function')) {
    const valueOf = v.valueOf()

    if (typeof valueOf === 'number') {
      res = valueOf
    } else if (typeof valueOf === 'boolean') {
      res = valueOf ? 1 : 0
    } else if (typeof valueOf === 'string') {
      const a = Number(valueOf)
      const b = Number.parseFloat(valueOf)

      res = (a === b) ? a : NaN
    }
  }

  return res
}
