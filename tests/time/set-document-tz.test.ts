import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_TZ } from '../../ts/time/set-document-tz.util.js'

describe(
  'SET_DOCUMENT_TZ',
  () => {
    const documentTzTestCases = [
      { name: 'setAttribute called', check: ({ setAttributeCalled }: { setAttributeCalled: boolean }) => setAttributeCalled === true },
      { name: 'setAttribute value', check: ({ setAttributeValue }: { setAttributeValue: string }) => setAttributeValue === 'UTC' },
    ]

    it.each(documentTzTestCases)(
      'should set document tz - $name',
      ({ check }) => {
        const originalWindow = global.window
        let setAttributeCalled = false
        let setAttributeValue = ''
        global.window = {
          document: {
            documentElement: {
              // eslint-disable-next-line max-params
              setAttribute: (key: string, value: string) => {
                if (key === 'tz') {
                  setAttributeCalled = true
                  setAttributeValue = value
                }
              },
            },
          },
        } as any

        SET_DOCUMENT_TZ('UTC')

        global.window = originalWindow

        expect(check({ setAttributeCalled, setAttributeValue })).toBe(true)
      }
    )
  }
)
