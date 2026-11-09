/** CHECK (is a `Set` instance of the empty set `∅`) */
export function IS_A_SET_AND_EMPTY<T> (o: any): o is Set<T> {
  return (o instanceof Set) && (o.size === 0)
}
