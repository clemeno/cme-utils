/**
 * Converts the path or url of a light PNG file into the one of its dark variant: `file`.png becomes `file`_dark.png.
 * @param lightPngPath - The path or url of the light PNG
 * @returns The path or url of the dark PNG; unchanged when it does not end with .png
 * @example
 * ```typescript
 * GET_DARK_FROM_LIGHT_PNG_FILE('img/a.png') // returns 'img/a_dark.png'
 * GET_DARK_FROM_LIGHT_PNG_FILE('a.PNG') // returns 'a_dark.png'
 * GET_DARK_FROM_LIGHT_PNG_FILE('a.jpg') // returns 'a.jpg'
 * ```
 */
export function GET_DARK_FROM_LIGHT_PNG_FILE (lightPngPath: string): string {
  return lightPngPath.replace(/\.png$/i, '_dark.png')
}
