/** @returns {boolean} `s` has the .png extension - case insensitive - in the end? */
export const IS_A_DOT_PNG = (s: string): boolean => /\.png$/i.test(s)
