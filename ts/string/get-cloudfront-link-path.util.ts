/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`filename` */
export const GET_CLOUDFRONT_LINK_PATH = (_: { filename: string, publicStaticImageFolder: string }): string => {
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${_.filename}`
}
