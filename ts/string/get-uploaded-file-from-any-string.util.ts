import { GET_FILE_LOCATION_FROM_ANY_STRING } from './get-file-location-from-any-string.util.js'
import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'

/**
 * Converts any string (uuid, upload path, static path, url or file name) into the upload path of its file.
 * Any string holding a uuid gives the light png of that uuid, even `uuid`_dark.png or `uuid`.pdf: every upload is `uuid`.png.
 * @param _ - The object parameter
 * @param _.basename - The basename function, for example `basename` of 'node:path'
 * @param _.s - The string to convert: a uuid, a path, a url or a file name
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The upload path of the file, or '' (empty string) when `s` is a url without a file name
 * @example
 * ```typescript
 * const basename = (s: string): string => s.slice(s.lastIndexOf('/') + 1)
 * const opts = { basename, fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: '123e4567-e89b-12d3-a456-426614174000' }) // returns './uploads/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_UPLOADED_FILE_FROM_ANY_STRING({ ...opts, s: './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png' }) // returns './uploads/123e4567-e89b-12d3-a456-426614174000.png'
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
  const { kind, filename } = GET_FILE_LOCATION_FROM_ANY_STRING(_)

  // a path already in the upload folder stays as given
  return (kind === 'upload') ? _.s : ((kind === 'none') ? '' : GET_UPLOADED_FILE_PATH({ filename, fileUploadFolder: _.fileUploadFolder }))
}
