/** @returns {string} https:\//subdomain.cloudfront.com/`filename` -> https:\//subdomain.domain.com/api/public_img/`filename` */
export const GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL = (_: {
  cloudfrontUrl: string
  cloudfrontUri: string
  rootUrlPublicImg: string
}): string => {
  return _.cloudfrontUrl.replace(_.cloudfrontUri, _.rootUrlPublicImg)
}
