import { GET_CLOUDFRONT_LINK_PATH } from './get-cloudfront-link-path.util.js'
import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/**
 * Builds the static link of the light PNG of an uuid: the public static image folder followed by `uuid`.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.publicStaticImageFolder - The folder of the public static images, with or without a trailing /
 * @returns The static link of the light PNG
 * @example
 * ```typescript
 * GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', publicStaticImageFolder: '/static' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000.png'
 * GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', publicStaticImageFolder: '/static/' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000.png'
 * ```
 */
export function GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID (_: { uuid: string, publicStaticImageFolder: string }): string {
  return GET_CLOUDFRONT_LINK_PATH({ filename: GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid), publicStaticImageFolder: _.publicStaticImageFolder })
}
