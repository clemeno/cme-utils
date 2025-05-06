/** CHECK (is a `Map` instance of the empty map `T:∅ → U`) */
export const IS_A_MAP_AND_EMPTY = <T = any, U = any> (o: any): o is Map<T, U> => (o instanceof Map) && (o.size === 0)
