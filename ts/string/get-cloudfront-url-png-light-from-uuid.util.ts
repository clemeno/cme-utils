import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/**
 * Builds the CloudFront url of the light PNG of an uuid: the CloudFront uri followed by `uuid`.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.cloudfrontUri - The CloudFront root uri, with or without a trailing /
 * @returns The CloudFront url of the light PNG
 * @example
 * ```typescript
 * GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', cloudfrontUri: 'https://cdn.example.com' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', cloudfrontUri: 'https://cdn.example.com/' }) // returns 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png'
 * ```
 */
export function GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID (_: { uuid: string, cloudfrontUri: string }): string {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.cloudfrontUri
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
