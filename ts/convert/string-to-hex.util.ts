/**
 * Convert a string to hex without using Buffer
 */
export const STRING_TO_HEX = (str: string): string => {
  let hex = ''

  for (let i = 0; i < str.length; i += 1) {
    hex += str.charCodeAt(i).toString(16)
  }

  return hex
}
