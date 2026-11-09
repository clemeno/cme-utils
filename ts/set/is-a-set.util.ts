/** CHECK (is a `Set` instance) */
export function IS_A_SET<T> (o: any): o is Set<T> {
  return o instanceof Set
}
