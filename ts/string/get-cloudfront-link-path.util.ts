import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'

/**
 * Builds the static link of a file: the public static image folder followed by `filename`.
 * @param _ - The object parameter
 * @param _.filename - The name of the file
 * @param _.publicStaticImageFolder - The folder of the public static images, with or without a trailing /
 * @returns The static link of the file
 * @example
 * ```typescript
 * GET_CLOUDFRONT_LINK_PATH({ filename: 'a.png', publicStaticImageFolder: '/static' }) // returns '/static/a.png'
 * GET_CLOUDFRONT_LINK_PATH({ filename: 'a.png', publicStaticImageFolder: '/static/' }) // returns '/static/a.png'
 * ```
 */
export function GET_CLOUDFRONT_LINK_PATH (_: { filename: string, publicStaticImageFolder: string }): string {
  return GET_UPLOADED_FILE_PATH({ filename: _.filename, fileUploadFolder: _.publicStaticImageFolder })
}
