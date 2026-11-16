import { GET_CLOUDFRONT_URL_FILE } from './get-cloudfront-url-file.util.js'
import { GET_FILE_NAME_AND_KIND_FROM_ANY_STRING } from './get-file-name-and-kind-from-any-string.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the CloudFront url of its file.
 * Any string holding a uuid gives the light png of that uuid, even `uuid`_dark.png or `uuid`.pdf: every upload is `uuid`.png.
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to convert: a uuid, a path, a url or a file name
 * @param _.cloudfrontUri - The CloudFront root uri
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The CloudFront url of the file, or '' (empty string) when `s` is a url without a file name
 * @example
 * ```typescript
 * const basename = (s: string): string => s.slice(s.lastIndexOf('/') + 1)
 * const opts = { basename, cloudfrontUri: 'https://cdn.example.com', fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: '123e4567-e89b-12d3-a456-426614174000' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: './uploads/a.png' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: 'a.png' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...opts, s: 'https://x.com/' }) // returns ''
 * ```
 */
export function GET_CLOUDFRONT_URL_FROM_ANY_STRING<TypeofBasename extends (s: string) => string> (_: {
  basename: TypeofBasename
  s: string
  cloudfrontUri: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string {
  const { kind, filename } = GET_FILE_NAME_AND_KIND_FROM_ANY_STRING(_)

  return (kind === 'url-without-file') ? '' : GET_CLOUDFRONT_URL_FILE({ filename, cloudfrontUri: _.cloudfrontUri })
}
