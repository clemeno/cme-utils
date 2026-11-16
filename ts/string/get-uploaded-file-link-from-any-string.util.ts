import { GET_CLOUDFRONT_LINK_PATH } from './get-cloudfront-link-path.util.js'
import { GET_FILE_NAME_AND_KIND_FROM_ANY_STRING } from './get-file-name-and-kind-from-any-string.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the static link of its file.
 * Any string holding a uuid gives the light png of that uuid, even `uuid`_dark.png or `uuid`.pdf: every upload is `uuid`.png.
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
 * GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...opts, s: './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000.png'
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
  const { kind, filename } = GET_FILE_NAME_AND_KIND_FROM_ANY_STRING(_)

  // a link already in the static folder stays as given
  return (kind === 'static') ? _.s : ((kind === 'url-without-file') ? '' : GET_CLOUDFRONT_LINK_PATH({ filename, publicStaticImageFolder: _.publicStaticImageFolder }))
}
