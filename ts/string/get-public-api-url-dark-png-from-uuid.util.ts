import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/**
 * Builds the public API url of the dark PNG of an uuid: the public API root followed by `uuid`_dark.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.rootUrlPublicImg - The root url of the public API images, with or without a trailing /
 * @returns The public API url of the dark PNG
 * @example
 * ```typescript
 * GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', rootUrlPublicImg: 'https://api.example.com/img' }) // returns 'https://api.example.com/img/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', rootUrlPublicImg: 'https://api.example.com/img/' }) // returns 'https://api.example.com/img/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * ```
 */
export function GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID (_: { uuid: string, rootUrlPublicImg: string }): string {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
