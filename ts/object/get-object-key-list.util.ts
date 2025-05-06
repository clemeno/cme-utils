/**
 * More accurately typed than the `.keys` method on any `object` instance
 * @returns the list of keys of an object as an array of any type a key can be
 */
export const GET_OBJECT_KEY_LIST = <T = any> (o: T): Array<keyof T> => Object.keys(o as any) as any
