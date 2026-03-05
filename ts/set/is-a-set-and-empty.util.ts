/** CHECK (is a `Set` instance of the empty set `∅`) */
export const IS_A_SET_AND_EMPTY = <T> (o: any): o is Set<T> => (o instanceof Set) && (o.size === 0)
