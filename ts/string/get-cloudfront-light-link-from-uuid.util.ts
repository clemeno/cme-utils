import { GET_LIGHT_PNG_NAME_FROM_UUID } from './get-light-png-name-from-uuid.util.js'

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`uuid`.png */
export const GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID = (_: { uuid: string, publicStaticImageFolder: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}
