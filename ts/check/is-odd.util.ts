/** CHECK (is an odd `numeric` value) */
export const IS_ODD = (v: any): boolean => {
  let res = false

  if (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
  ) {
    res = (+v % 2) === 1
  }

  return res
}
