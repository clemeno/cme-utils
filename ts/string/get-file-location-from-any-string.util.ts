import { IS_A_STRING_AND_NOT_EMPTY } from './is-a-string-and-not-empty.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/**
 * Classifies any string (uuid, upload path, static path, url or file name) and gives the name of its file.
 * The checks run in this order, the first match wins:
 * - 'uuid': `s` holds a uuid. Every upload is `uuid`.png, so any string holding the uuid gives that light png, even `uuid`_dark.png or `uuid`.pdf
 * - 'upload': `s` holds the upload folder; the file name is its basename
 * - 'static': `s` holds the public static image folder; the file name is its basename
 * - 'url': `s` is a url; the file name is the last segment of its path
 * - 'none': `s` is a url without a file name; the file name is '' (empty string)
 * - 'name': anything else; `s` is the file name
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to classify: a uuid, a path, a url or a file name
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The kind of `s` and the name of its file
 * @example
 * ```typescript
 * const basename = (s: string): string => s.slice(s.lastIndexOf('/') + 1)
 * const opts = { basename, fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png' }) // returns { kind: 'uuid', filename: '123e4567-e89b-12d3-a456-426614174000.png' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: './uploads/a.png' }) // returns { kind: 'upload', filename: 'a.png' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: '/static/a.png' }) // returns { kind: 'static', filename: 'a.png' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: 'https://x.com/a.png' }) // returns { kind: 'url', filename: 'a.png' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: 'https://x.com/' }) // returns { kind: 'none', filename: '' }
 * GET_FILE_LOCATION_FROM_ANY_STRING({ ...opts, s: 'a.png' }) // returns { kind: 'name', filename: 'a.png' }
 * ```
 */
export function GET_FILE_LOCATION_FROM_ANY_STRING (_: {
  basename: (s: string) => string
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): { kind: 'uuid' | 'upload' | 'static' | 'url' | 'none' | 'name', filename: string } {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => ({ kind: 'uuid' as const, filename: GET_LIGHT_PNG_NAME_FROM_UUID(uuid) }) },
    { if: () => s.includes(_.fileUploadFolder), then: () => ({ kind: 'upload' as const, filename: _.basename(s) }) },
    { if: () => s.includes(_.publicStaticImageFolder), then: () => ({ kind: 'static' as const, filename: _.basename(s) }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_A_STRING_AND_NOT_EMPTY(filename) ? { kind: 'url' as const, filename } : { kind: 'none' as const, filename: '' }
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? { kind: 'name', filename: s }
}
