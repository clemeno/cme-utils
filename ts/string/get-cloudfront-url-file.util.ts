import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'

/**
 * Builds the CloudFront url of a file: the CloudFront uri followed by `filename`.
 * @param _ - The object parameter
 * @param _.filename - The name of the file
 * @param _.cloudfrontUri - The CloudFront root uri, with or without a trailing /
 * @returns The CloudFront url of the file
 * @example
 * ```typescript
 * GET_CLOUDFRONT_URL_FILE({ filename: 'a.png', cloudfrontUri: 'https://cdn.example.com' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FILE({ filename: 'a.png', cloudfrontUri: 'https://cdn.example.com/' }) // returns 'https://cdn.example.com/a.png'
 * ```
 */
export function GET_CLOUDFRONT_URL_FILE (_: { filename: string, cloudfrontUri: string }): string {
  return GET_UPLOADED_FILE_PATH({ filename: _.filename, fileUploadFolder: _.cloudfrontUri })
  // return `${ENV.cloudfrontUri}/${filename}`
}
