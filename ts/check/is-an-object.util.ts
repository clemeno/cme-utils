/** CHECK (is an `object` instance, not `null`) */
export const IS_AN_OBJECT = (o: any): o is any => (o !== null) && (typeof o === 'object')
