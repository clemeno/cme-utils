/** CHECK (is an `object` instance, not `null`) */
export function IS_AN_OBJECT (o: any): o is any {
  return (o !== null) && (typeof o === 'object')
}
