/**
 * Converts the path or url of a dark PNG file into the one of its light variant: `file`_dark.png becomes `file`.png.
 * @param darkPngPath - The path or url of the dark PNG
 * @returns The path or url of the light PNG; unchanged when it does not end with _dark.png
 * @example
 * ```typescript
 * GET_LIGHT_FROM_DARK_PNG_FILE('img/a_dark.png') // returns 'img/a.png'
 * GET_LIGHT_FROM_DARK_PNG_FILE('a_dark.PNG') // returns 'a.png'
 * GET_LIGHT_FROM_DARK_PNG_FILE('a.png') // returns 'a.png'
 * ```
 */
export function GET_LIGHT_FROM_DARK_PNG_FILE (darkPngPath: string): string {
  return darkPngPath.replace(/_dark\.png$/i, '.png')
}
