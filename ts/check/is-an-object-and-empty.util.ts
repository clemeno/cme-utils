/** CHECK (is an `object` instance of `{}`, an empty `Record`) */
export const IS_AN_OBJECT_AND_EMPTY = (o: any): o is any => (
  (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length === 0)
)
