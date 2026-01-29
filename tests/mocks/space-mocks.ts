export function createMockDocument () {
  const setAttributeCalls: Array<[string, string]> = []
  const mock = {
    documentElement: {
      // eslint-disable-next-line max-params
      setAttribute: (key: string, value: string) => {
        setAttributeCalls.push([key, value])
      },
    },
    getSetAttributeCalls: () => setAttributeCalls,
  }
  return mock
}

export function createMockSettings (initialLocale = 'old') {
  return { defaultLocale: initialLocale }
}
