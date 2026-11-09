/** A hash function that records its calls */
interface MockHashFn {
  (password: string, iterations: number): Promise<string>
  getCalls: () => Array<[string, number]>
}

/** A compare function that records its calls */
interface MockCompareFn {
  (clear: string, hash: string): Promise<boolean>
  getCalls: () => Array<[string, string]>
}

export function createMockHashFn (options: { returnValue?: string; shouldThrow?: boolean; errorMessage?: string } = {}): MockHashFn {
  const { returnValue = 'mock_hash', shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, number]> = []
  // eslint-disable-next-line max-params
  async function fn (password: string, iterations: number): Promise<string> {
    calls.push([password, iterations])
    if (shouldThrow) {
      throw new Error(errorMessage)
    }
    return returnValue
  }
  fn.getCalls = () => calls
  return fn
}

export function createMockCompareFn (options: { returnValue?: boolean; shouldThrow?: boolean; errorMessage?: string } = {}): MockCompareFn {
  const { returnValue = true, shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, string]> = []
  // eslint-disable-next-line max-params
  async function fn (clear: string, hash: string): Promise<boolean> {
    calls.push([clear, hash])
    if (shouldThrow) {
      throw new Error(errorMessage)
    }
    return returnValue
  }
  fn.getCalls = () => calls
  return fn
}
