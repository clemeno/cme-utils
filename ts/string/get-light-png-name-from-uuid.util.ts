/**
 * Builds the file name of the light PNG of an uuid: `uuid`.png.
 * @param uuid - The uuid of the image
 * @returns The file name of the light PNG
 * @example
 * ```typescript
 * GET_LIGHT_PNG_NAME_FROM_UUID('123e4567-e89b-12d3-a456-426614174000') // returns '123e4567-e89b-12d3-a456-426614174000.png'
 * GET_LIGHT_PNG_NAME_FROM_UUID('') // returns '.png'
 * ```
 */
export function GET_LIGHT_PNG_NAME_FROM_UUID (uuid: string): string {
  return `${uuid}.png`
}
