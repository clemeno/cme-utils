/** @returns {string} https:\//subdomain.domain.com/api/public_img/`filename` */
export const GET_PUBLIC_API_URL_FILE = (_: { filename: string, rootUrlPublicImg: string }): string => {
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${_.filename}`
}
