/** CHECK (is a numeric `string`) or (a `number`, not `NaN`) */
export function IS_NUMERIC (v: any): boolean {
  return (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
  )
}
