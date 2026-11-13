/** An axios-like `get` that records its calls */
interface MockAxios {
  // eslint-disable-next-line max-params
  get: (url: string, options: Record<string, unknown>) => Promise<{ data: Buffer }>
  getCalls: () => Array<[string, any]>
}

/** A writeFile-like function that records its calls */
interface MockWriteFile {
  (path: string, data: Buffer): Promise<void>
  getCalls: () => Array<[string, Buffer]>
}

export function createMockAxios (options: { data?: Buffer; shouldThrow?: boolean; errorMessage?: string } = {}): MockAxios {
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

export function createMockWriteFile (options: { shouldThrow?: boolean; errorMessage?: string } = {}): MockWriteFile {
  const { shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, Buffer]> = []
  // eslint-disable-next-line max-params
  async function fn (path: string, data: Buffer): Promise<void> {
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
export function createMockReadStream (chunks: Array<Buffer | string>): AsyncIterable<Buffer | string> {
  return {
    async * [Symbol.asyncIterator] () {
      for (const chunk of chunks) {
        yield chunk
      }
    },
  }
}

/**
 * Returns a web `ReadableStream` of the provided `chunks`, which then fails with `error` when one is given.
 * Its async iteration is removed, as Safari has none: only its `getReader()` reads it.
 */
export function createMockWebReadStream (options: { chunks: Uint8Array[], error?: Error }): ReadableStream<Uint8Array> {
  const { chunks, error } = options
  const stream = new ReadableStream<Uint8Array>({
    start (controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk)
      }
      if (error === undefined) {
        controller.close()
      }
    },
    // called once the chunks are read (an error in start would drop them unread): the stream then fails
    pull (controller) {
      controller.error(error)
    },
  })
  Object.defineProperty(stream, Symbol.asyncIterator, { value: undefined })
  return stream
}
