/** CHECK (is a numeric `string`) or (a `number`, not `NaN`) */
export const IS_NUMERIC = (v: any): boolean => (
  ((typeof v === 'number') && !Number.isNaN(v)) ||
  ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
)
