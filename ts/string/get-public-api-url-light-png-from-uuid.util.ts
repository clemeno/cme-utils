import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/**
 * Builds the public API url of the light PNG of an uuid: the public API root followed by `uuid`.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.rootUrlPublicImg - The root url of the public API images, with or without a trailing /
 * @returns The public API url of the light PNG
 * @example
 * ```typescript
 * GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', rootUrlPublicImg: 'https://api.example.com/img' }) // returns 'https://api.example.com/img/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', rootUrlPublicImg: 'https://api.example.com/img/' }) // returns 'https://api.example.com/img/123e4567-e89b-12d3-a456-426614174000.png'
 * ```
 */
export function GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID (_: { uuid: string, rootUrlPublicImg: string }): string {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
