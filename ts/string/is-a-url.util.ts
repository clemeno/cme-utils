/** @returns {boolean} `s` is a url string. It must be safe to instantiate a new URL(`s`) */
export const IS_A_URL = (s: string): boolean => /^(https?:)?\/\//.test(s)
