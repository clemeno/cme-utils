/** @returns {string} (path|url)?file`.png` -> (path|url)?file`_dark.png` */
export const GET_DARK_FROM_LIGHT_PNG_FILE = (lightPngPath: string): string => {
  return lightPngPath.replace(/\.png$/i, '_dark.png')
}
