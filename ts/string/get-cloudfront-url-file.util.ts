/** @returns {string} https:\//subdomain.cloudfront.com/`filename` */
export const GET_CLOUDFRONT_URL_FILE = (_: { filename: string, cloudfrontUri: string }): string => {
  const envEndpoint = _.cloudfrontUri
  const endpoint = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpoint}${_.filename}`
  // return `${ENV.cloudfrontUri}/${filename}`
}
