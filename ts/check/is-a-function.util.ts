export function IS_A_FUNCTION<T> (o: any): o is ((..._: any) => T) {
  return typeof o === 'function'
}
