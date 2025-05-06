export const IS_UUID_STRING = (v: any): boolean => {
  return (
    (typeof v === 'string') &&
    (v !== '') &&
    (v.length === 36) &&
    (v[8] === '-') &&
    (v[13] === '-') &&
    (v[18] === '-') &&
    (v[23] === '-') &&
    (v === v.toLowerCase()) &&
    (v === v.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)?.[0])
  )
}
