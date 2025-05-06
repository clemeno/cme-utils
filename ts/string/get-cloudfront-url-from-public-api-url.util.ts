/** @returns {string} https:\//subdomain.domain.com/api/public_img/`filename` -> https:\//subdomain.cloudfront.com/`filename` */
export const GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL = (_: {
  publicImgUrl: string
  rootUrlPublicImg: string
  cloudfrontUri: string
}): string => {
  return _.publicImgUrl.replace(_.rootUrlPublicImg, _.cloudfrontUri)
}
