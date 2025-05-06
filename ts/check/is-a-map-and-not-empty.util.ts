export const IS_A_MAP_AND_NOT_EMPTY = <T, U> (o: any): o is Map<T, U> => (o instanceof Map) && (o.size !== 0)
