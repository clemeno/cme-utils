/** CHECK (is a `Map` instance) */
export function IS_A_MAP<T = any, U = any> (o: any): o is Map<T, U> {
  return o instanceof Map
}
