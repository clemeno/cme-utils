import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/** @returns {string} https:\//subdomain.cloudfront.com/`uuid`.png */
export const GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID = (_: { uuid: string, cloudfrontUri: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.cloudfrontUri
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}
