import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_TZ } from '../../ts/time/set-document-tz.util.js'

describe(
  'SET_DOCUMENT_TZ',
  () => {
    const documentTzTestCases: Array<{ name: string, input: string, expected: string[][] }> = [
      { name: 'UTC', input: 'UTC', expected: [['tz', 'UTC']] },
      { name: 'Europe/Paris', input: 'Europe/Paris', expected: [['tz', 'Europe/Paris']] },
    ]

    it.each(documentTzTestCases)(
      'should set the document tz attribute - $name',
      ({ input, expected }) => {
        const originalWindow = global.window
        const setAttributeCalls: string[][] = []
        global.window = {
          document: {
            documentElement: {
              // eslint-disable-next-line max-params
              setAttribute: (key: string, value: string) => {
                setAttributeCalls.push([key, value])
              },
            },
          },
        } as any

        SET_DOCUMENT_TZ(input)

        global.window = originalWindow

        expect(setAttributeCalls).toEqual(expected)
      }
    )
  }
)
