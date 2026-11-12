import { afterEach, describe, expect, it } from 'bun:test'
import { GET_BASE_URI } from '../../ts/http/get-base-uri.util.js'

/** Installs a fake global window whose document.documentElement is inDocumentElement. */
function setDocumentElement (inDocumentElement: object): void {
  global.window = { document: { documentElement: inDocumentElement } } as any
}

describe(
  'GET_BASE_URI',
  () => {
    const originalWindow = global.window

    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, setup: () => void, expected: string }>([
      {
        name: 'should return baseURI without trailing slash',
        setup: () => { setDocumentElement({ baseURI: 'https://example.com/app/' }) },
        expected: 'https://example.com/app',
      },
      {
        name: 'should return baseURI as-is when no trailing slash',
        setup: () => { setDocumentElement({ baseURI: 'https://example.com' }) },
        expected: 'https://example.com',
      },
      {
        name: 'should return empty string when window.document is not available',
        setup: () => { delete (global as any).window },
        expected: '',
      },
      {
        name: 'should return empty string when the window has no document (Deno 1.x)',
        setup: () => { global.window = {} as any },
        expected: '',
      },
      {
        name: 'should handle complex URIs',
        setup: () => { setDocumentElement({ baseURI: 'https://example.com:8080/path/to/app/' }) },
        expected: 'https://example.com:8080/path/to/app',
      },
    ])(
      '$name',
      ({ setup, expected }) => {
        setup()

        expect(GET_BASE_URI()).toBe(expected)
      }
    )
  }
)
