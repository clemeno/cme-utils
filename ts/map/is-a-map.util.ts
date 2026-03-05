/** CHECK (is a `Map` instance) */
export const IS_A_MAP = <T = any, U = any> (o: any): o is Map<T, U> => o instanceof Map
