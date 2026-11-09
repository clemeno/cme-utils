/**
 * Builds the public API url of a file: the public API root followed by `filename`.
 * @param _ - The object parameter
 * @param _.filename - The name of the file
 * @param _.rootUrlPublicImg - The root url of the public API images, with or without a trailing /
 * @returns The public API url of the file
 * @example
 * ```typescript
 * GET_PUBLIC_API_URL_FILE({ filename: 'a.png', rootUrlPublicImg: 'https://api.example.com/img' }) // returns 'https://api.example.com/img/a.png'
 * GET_PUBLIC_API_URL_FILE({ filename: 'a.png', rootUrlPublicImg: 'https://api.example.com/img/' }) // returns 'https://api.example.com/img/a.png'
 * ```
 */
export function GET_PUBLIC_API_URL_FILE (_: { filename: string, rootUrlPublicImg: string }): string {
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${_.filename}`
}
