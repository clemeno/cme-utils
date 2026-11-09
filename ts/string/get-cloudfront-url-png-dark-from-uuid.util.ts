import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/**
 * Builds the CloudFront url of the dark PNG of an uuid: the CloudFront uri followed by `uuid`_dark.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.cloudfrontUri - The CloudFront root uri, with or without a trailing /
 * @returns The CloudFront url of the dark PNG
 * @example
 * ```typescript
 * GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', cloudfrontUri: 'https://cdn.example.com' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', cloudfrontUri: 'https://cdn.example.com/' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * ```
 */
export function GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID (_: { uuid: string, cloudfrontUri: string }): string {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.cloudfrontUri
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
