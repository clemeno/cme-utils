/** CHECK (is an `object` instance of `{}`, an empty `Record`) */
export function IS_AN_OBJECT_AND_EMPTY (o: any): o is any {
  return (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length === 0)
}
