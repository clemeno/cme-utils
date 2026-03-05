/** CHECK (is a `Set` instance with at least 1 member) */
export const IS_A_SET_AND_NOT_EMPTY = <T> (o: any): o is Set<T> => (o instanceof Set) && (o.size !== 0)
