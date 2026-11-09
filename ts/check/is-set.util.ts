export function IS_SET<T> (v: T | null | undefined): v is T {
  return (v !== null) && (typeof v !== 'undefined')
}
