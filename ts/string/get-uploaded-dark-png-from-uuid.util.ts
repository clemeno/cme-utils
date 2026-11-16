import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'
import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'

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
  return GET_UPLOADED_FILE_PATH({ filename: GET_DARK_PNG_NAME_FROM_UUID(_.uuid), fileUploadFolder: _.fileUploadFolder })
}
