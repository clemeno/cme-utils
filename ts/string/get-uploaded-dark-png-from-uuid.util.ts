import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/**
 * Builds the upload path of the dark PNG of an uuid: the upload folder followed by `uuid`_dark.png.
 * @param _ - The object parameter
 * @param _.uuid - The uuid of the image
 * @param _.fileUploadFolder - The upload folder, with or without a trailing /
 * @returns The upload path of the dark PNG
 * @example
 * ```typescript
 * GET_UPLOADED_DARK_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', fileUploadFolder: './uploads' }) // returns './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * GET_UPLOADED_DARK_PNG_FROM_UUID({ uuid: '123e4567-e89b-12d3-a456-426614174000', fileUploadFolder: './uploads/' }) // returns './uploads/123e4567-e89b-12d3-a456-426614174000_dark.png'
 * ```
 */
export function GET_UPLOADED_DARK_PNG_FROM_UUID (_: { uuid: string, fileUploadFolder: string }): string {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}
