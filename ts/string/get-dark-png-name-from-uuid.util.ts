/**
 * Builds the file name of the dark PNG of an uuid: `uuid`_dark.png.
 * @param uuid - The uuid of the image
 * @returns The file name of the dark PNG
 * @example
 * ```typescript
 * GET_DARK_PNG_NAME_FROM_UUID('123e4567-e89b-12d3-a456-426614174000') // returns '123e4567-e89b-12d3-a456-426614174000_dark.png'
 * GET_DARK_PNG_NAME_FROM_UUID('') // returns '_dark.png'
 * ```
 */
export function GET_DARK_PNG_NAME_FROM_UUID (uuid: string): string {
  return `${uuid}_dark.png`
}
