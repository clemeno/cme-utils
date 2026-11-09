/**
 * Converts a public API image url into the CloudFront url of the same file, by swapping the root url.
 * @param _ - The object parameter
 * @param _.publicImgUrl - The public API image url
 * @param _.rootUrlPublicImg - The root url of the public API images
 * @param _.cloudfrontUri - The CloudFront root uri, with or without a trailing /
 * @returns The url with the public API root replaced by the CloudFront uri
 * @example
 * ```typescript
 * GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL({ publicImgUrl: 'https://api.example.com/img/a.png', rootUrlPublicImg: 'https://api.example.com/img', cloudfrontUri: 'https://cdn.example.com' }) // returns 'https://cdn.example.com/a.png'
 * GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL({ publicImgUrl: 'https://other.com/a.png', rootUrlPublicImg: 'https://api.example.com/img', cloudfrontUri: 'https://cdn.example.com' }) // returns 'https://other.com/a.png'
 * ```
 */
export function GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL (_: {
  publicImgUrl: string
  rootUrlPublicImg: string
  cloudfrontUri: string
}): string {
  return _.publicImgUrl.replace(_.rootUrlPublicImg, _.cloudfrontUri)
}
