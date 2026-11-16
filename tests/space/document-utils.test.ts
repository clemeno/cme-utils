import { afterEach, describe, expect, it } from 'bun:test'
import { GET_BASE_URI } from '../../ts/http/get-base-uri.util.js'
import { SET_DOCUMENT_GEO } from '../../ts/space/set-document-geo.util.js'
import { SET_DOCUMENT_LANG } from '../../ts/space/set-document-lang.util.js'
import { SET_DOCUMENT_LOCALE } from '../../ts/space/set-document-locale.util.js'
import { SET_DOCUMENT_TZ } from '../../ts/time/set-document-tz.util.js'

/** Throws the error of the broken document. */
function throwDocumentBroke (): never {
  throw new Error('document broke')
}

// the utils that reach the browser document: a missing window, document or root element is skipped, a present one that throws throws (AGENTS.md)
const documentUtilList: Array<{ name: string, call: () => unknown }> = [
  { name: 'GET_BASE_URI', call: () => GET_BASE_URI() },
  { name: 'SET_DOCUMENT_GEO', call: () => SET_DOCUMENT_GEO('CA') },
  { name: 'SET_DOCUMENT_LANG', call: () => SET_DOCUMENT_LANG('fr') },
  { name: 'SET_DOCUMENT_LOCALE', call: () => SET_DOCUMENT_LOCALE('fr-CA') },
  { name: 'SET_DOCUMENT_TZ', call: () => SET_DOCUMENT_TZ('Europe/Paris') },
]

const missingList: Array<{ name: string, fakeWindow: unknown }> = [
  { name: 'no window (Node, bun, a worker)', fakeWindow: undefined },
  { name: 'a window without document (Deno 1.x)', fakeWindow: {} },
  { name: 'a document without root element', fakeWindow: { document: { documentElement: null } } },
]

const brokenWindow = {
  document: {
    documentElement: {
      get baseURI (): string {
        return throwDocumentBroke()
      },
      getAttribute: throwDocumentBroke,
      setAttribute: throwDocumentBroke,
    },
  },
}

describe(
  'document utils',
  () => {
    const originalWindow = global.window

    afterEach(() => {
      global.window = originalWindow
    })

    it.each(documentUtilList.flatMap(util => missingList.map(missing => ({ name: `${util.name} skips ${missing.name}`, call: util.call, fakeWindow: missing.fakeWindow }))))(
      '$name',
      ({ call, fakeWindow }) => {
        global.window = fakeWindow as any

        expect(call).not.toThrow()
      }
    )

    it.each(documentUtilList)(
      '$name lets the error of a document that throws through',
      ({ call }) => {
        global.window = brokenWindow as any

        expect(call).toThrow(new Error('document broke'))
      }
    )
  }
)
