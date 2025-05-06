import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`uuid`_dark.png */
export const GET_CLOUDFRONT_DARK_LINK_FROM_UUID = (_: { uuid: string, publicStaticImageFolder: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}
