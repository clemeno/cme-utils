/**
 * Converts a CloudFront url into the public API url of the same file, by swapping the root.
 * @param _ - The object parameter
 * @param _.cloudfrontUrl - The CloudFront url
 * @param _.cloudfrontUri - The CloudFront root uri, with or without a trailing /
 * @param _.rootUrlPublicImg - The root url of the public API images
 * @returns The url with the CloudFront uri replaced by the public API root
 * @example
 * ```typescript
 * GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL({ cloudfrontUrl: 'https://cdn.example.com/a.png', cloudfrontUri: 'https://cdn.example.com', rootUrlPublicImg: 'https://api.example.com/img' }) // returns 'https://api.example.com/img/a.png'
 * GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL({ cloudfrontUrl: 'https://other.com/a.png', cloudfrontUri: 'https://cdn.example.com', rootUrlPublicImg: 'https://api.example.com/img' }) // returns 'https://other.com/a.png'
 * ```
 */
export function GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL (_: {
  cloudfrontUrl: string
  cloudfrontUri: string
  rootUrlPublicImg: string
}): string {
  return _.cloudfrontUrl.replace(_.cloudfrontUri, _.rootUrlPublicImg)
}
