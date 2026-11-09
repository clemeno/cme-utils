import { IS_A_STRING_AND_NOT_EMPTY } from './is-a-string-and-not-empty.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_CLOUDFRONT_URL_FILE } from './get-cloudfront-url-file.util.js'
import { GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID } from './get-cloudfront-url-png-light-from-uuid.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the CloudFront url of its file.
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to convert: a uuid, a path, a url or a file name
 * @param _.cloudfrontUri - The CloudFront root uri
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The CloudFront url of the file, or '' (empty string) when `s` is a url without a file name
 * @example
 * ```typescript
 * const basename = s => s.split('/').pop()
 * const opts = { basename, cloudfrontUri: 'https://cdn.example.com', fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: '123e4567-e89b-12d3-a456-426614174000' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: './uploads/a.png' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: 'a.png' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: 'https://x.com/' }) // returns ''
 * ```
 */
export function GET_CLOUDFRONT_URL_FROM_ANY_STRING<TypeofBasename = any> (_: {
  basename: TypeofBasename
  s: string
  cloudfrontUri: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const cloudfrontUri = _.cloudfrontUri
  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const basename: any = _.basename

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID({ uuid, cloudfrontUri }) },
    { if: () => s.includes(fileUploadFolder), then: () => GET_CLOUDFRONT_URL_FILE({ filename: basename(s), cloudfrontUri }) },
    { if: () => s.includes(publicStaticImageFolder), then: () => GET_CLOUDFRONT_URL_FILE({ filename: basename(s), cloudfrontUri }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_A_STRING_AND_NOT_EMPTY(filename) ? GET_CLOUDFRONT_URL_FILE({ filename, cloudfrontUri }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_URL_FILE({ filename: s, cloudfrontUri })
}
