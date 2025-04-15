/** idenftity function */
export const IDENTITY = (_: any): any => _

/** no operation function */
export const NOOP: (..._: any) => void = () => {}

/** asynchronous identity function */
export const ASYNC_IDENTITY = async (_: any): Promise<any> => _

/** asynchronous no operation function */
export const ASYNC_NOOP = async (): Promise<void> => {}
