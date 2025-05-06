import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/** @returns {string} https:\//subdomain.domain.com/api/public_img/`uuid`.png */
export const GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID = (_: { uuid: string, rootUrlPublicImg: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
