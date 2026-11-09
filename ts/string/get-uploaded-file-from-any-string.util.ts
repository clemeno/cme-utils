import { IS_A_STRING_AND_NOT_EMPTY } from './is-a-string-and-not-empty.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'
import { GET_UPLOADED_LIGHT_PNG_FROM_UUID } from './get-uploaded-light-png-from-uuid.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the upload path of its file.
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to convert: a uuid, a path, a url or a file name
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The upload path of the file, or '' (empty string) when `s` is a url without a file name
 * @example
 * ```typescript
 * const basename = s => s.split('/').pop()
 * const opts = { basename, fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: '123e4567-e89b-12d3-a456-426614174000' }) // returns './uploads/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: '/static/a.png' }) // returns './uploads/a.png'
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: 'a.png' }) // returns './uploads/a.png'
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: 'https://x.com/' }) // returns ''
 * ```
 */
export function GET_UPLOADED_FILE_FROM_ANY_STRING<TypeofBasename extends (s: string) => string> (_: {
  basename: TypeofBasename
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_UPLOADED_LIGHT_PNG_FROM_UUID({ uuid, fileUploadFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => s },
    { if: () => s.includes(publicStaticImageFolder), then: () => GET_UPLOADED_FILE_PATH({ filename: _.basename(s), fileUploadFolder }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_A_STRING_AND_NOT_EMPTY(filename) ? GET_UPLOADED_FILE_PATH({ filename, fileUploadFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_UPLOADED_FILE_PATH({ filename: s, fileUploadFolder })
}
