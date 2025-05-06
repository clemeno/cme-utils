/** @returns {string} (path|url)?file`_dark.png` -> (path|url)?file`.png` */
export const GET_LIGHT_FROM_DARK_PNG_FILE = (darkPngPath: string): string => {
  return darkPngPath.replace(/_dark\.png$/i, '.png')
}
