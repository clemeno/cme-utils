import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/**
 * Builds the static link of the dark PNG of an uuid: the public static image folder followed by `uuid`_dark.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.publicStaticImageFolder - The folder of the public static images, with or without a trailing /
 * @returns The static link of the dark PNG
 * @example
 * ```typescript
 * GET_CLOUDFRONT_DARK_LINK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', publicStaticImageFolder: '/static' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * GET_CLOUDFRONT_DARK_LINK_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', publicStaticImageFolder: '/static/' }) // returns '/static/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * ```
 */
export function GET_CLOUDFRONT_DARK_LINK_FROM_UUID (_: { uuid: string, publicStaticImageFolder: string }): string {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}
