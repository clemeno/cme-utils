import { IS_A_STRING_AND_NOT_EMPTY } from './is-a-string-and-not-empty.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID } from './get-cloudfront-light-link-from-uuid.util.js'
import { GET_CLOUDFRONT_LINK_PATH } from './get-cloudfront-link-path.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the static link of its file.
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to convert: a uuid, a path, a url or a file name
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The static link of the file, or '' (empty string) when `s` is a url without a file name
 * @example
 * ```typescript
 * const basename = (s: string): string => s.slice(s.lastIndexOf('/') + 1)
 * const opts = { basename, fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...opts, s: '123e4567-e89b-12d3-a456-426614174000' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...opts, s: './uploads/a.png' }) // returns '/static/a.png'
 * GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...opts, s: 'a.png' }) // returns '/static/a.png'
 * GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...opts, s: 'https://x.com/' }) // returns ''
 * ```
 */
export function GET_UPLOADED_FILE_LINK_FROM_ANY_STRING<TypeofBasename extends (s: string) => string> (_: {
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
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID({ uuid, publicStaticImageFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => GET_CLOUDFRONT_LINK_PATH({ filename: _.basename(s), publicStaticImageFolder }) },
    { if: () => s.includes(publicStaticImageFolder), then: () => s },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_A_STRING_AND_NOT_EMPTY(filename) ? GET_CLOUDFRONT_LINK_PATH({ filename, publicStaticImageFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_LINK_PATH({ filename: s, publicStaticImageFolder })
}
