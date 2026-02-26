export function createMockAxios (options: { data?: Buffer; shouldThrow?: boolean; errorMessage?: string } = {}) {
  const { data = Buffer.from('mock data'), shouldThrow = false, errorMessage = 'mock error' } = options
  const getCalls: Array<[string, any]> = []
  const mock = {
    // eslint-disable-next-line max-params
    get: async (url: string, options: Record<string, unknown>) => {
      getCalls.push([url, options])
      if (shouldThrow) {
        throw new Error(errorMessage)
      }
      return { data }
    },
    getCalls: () => getCalls,
  }
  return mock
}

export function createMockWriteFile (options: { shouldThrow?: boolean; errorMessage?: string } = {}) {
  const { shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, Buffer]> = []
  // eslint-disable-next-line max-params
  const fn = async (path: string, data: Buffer) => {
    calls.push([path, data])
    if (shouldThrow) {
      throw new Error(errorMessage)
    }
  }
  fn.getCalls = () => calls
  return fn
}

/**
 * Returns an async-iterable stream that yields the provided `chunks` in order.
 * Suitable for use as the return value of a `createReadStream` mock.
 */
export function createMockReadStream (chunks: Buffer[]) {
  return {
    async * [Symbol.asyncIterator] () {
      for (const chunk of chunks) {
        yield chunk
      }
    },
  }
}
