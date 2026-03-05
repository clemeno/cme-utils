/** CHECK (is an `object` instance, a `Record` with at least 1 key) */
export const IS_AN_OBJECT_AND_NOT_EMPTY = (o: any): o is any => (
  (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length !== 0)
)
