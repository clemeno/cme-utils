export function createMockHashFn (options: { returnValue?: string; shouldThrow?: boolean; errorMessage?: string } = {}) {
  const { returnValue = 'mock_hash', shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, number]> = []
  // eslint-disable-next-line max-params
  const fn = async (password: string, iterations: number) => {
    calls.push([password, iterations])
    if (shouldThrow) {
      throw new Error(errorMessage)
    }
    return returnValue
  }
  fn.getCalls = () => calls
  return fn
}

export function createMockCompareFn (options: { returnValue?: boolean; shouldThrow?: boolean; errorMessage?: string } = {}) {
  const { returnValue = true, shouldThrow = false, errorMessage = 'mock error' } = options
  const calls: Array<[string, string]> = []
  // eslint-disable-next-line max-params
  const fn = async (clear: string, hash: string) => {
    calls.push([clear, hash])
    if (shouldThrow) {
      throw new Error(errorMessage)
    }
    return returnValue
  }
  fn.getCalls = () => calls
  return fn
}
