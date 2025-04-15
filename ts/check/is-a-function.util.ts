export const IS_A_FUNCTION = <T> (o: any): o is ((..._: any) => T) => typeof o === 'function'
