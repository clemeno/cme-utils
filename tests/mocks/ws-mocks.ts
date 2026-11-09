/** An axios-like `request` that records its calls */
interface MockAxiosForWS {
  request: (config: any) => Promise<{ data: any }>
  getRequestCalls: () => any[]
}

export function createMockAxiosForWS (options: { data?: any; shouldThrow?: boolean; errorMessage?: string } = {}): MockAxiosForWS {
  const { data = 'response', shouldThrow = false, errorMessage = 'mock error' } = options
  const requestCalls: Array<any> = []
  const mock = {
    request: async (config: any) => {
      requestCalls.push(config)
      if (shouldThrow) {
        throw new Error(errorMessage)
      }
      return { data }
    },
    getRequestCalls: () => requestCalls,
  }
  return mock
}
