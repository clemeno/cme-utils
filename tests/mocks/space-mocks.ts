export function createMockDocument (options: { getAttributeValue?: string } = {}) {
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

export function createMockSettings (initialLocale = 'old') {
  return { defaultLocale: initialLocale }
}
