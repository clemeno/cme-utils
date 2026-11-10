/** A document stub whose attribute calls are recorded */
interface MockDocument {
  documentElement: {
    // eslint-disable-next-line max-params
    setAttribute: (key: string, value: string) => void
    getAttribute: (key: string) => string
  }
  getSetAttributeCalls: () => Array<[string, string]>
  getGetAttributeCalls: () => string[]
}

export function createMockDocument (options: { getAttributeValue?: string } = {}): MockDocument {
  const { getAttributeValue = '' } = options
  const setAttributeCalls: Array<[string, string]> = []
  const getAttributeCalls: Array<string> = []
  const mock = {
    documentElement: {
      // eslint-disable-next-line max-params
      setAttribute: (key: string, value: string) => {
        setAttributeCalls.push([key, value])
      },
      getAttribute: (key: string) => {
        getAttributeCalls.push(key)
        return getAttributeValue
      },
    },
    getSetAttributeCalls: () => setAttributeCalls,
    getGetAttributeCalls: () => getAttributeCalls,
  }
  return mock
}
