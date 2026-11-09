/** CHECK (is a `Map` instance of the empty map `T:∅ → U`) */
export function IS_A_MAP_AND_EMPTY<T = any, U = any> (o: any): o is Map<T, U> {
  return (o instanceof Map) && (o.size === 0)
}
