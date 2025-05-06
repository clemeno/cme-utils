/** @returns {string} ./uploads/`filename` -> /opt/cme/svd/www/svd/public_html/static/`filename` */
export const GET_SYMLINK_PATH_FROM_FILE_PATH = (_: {
  filePath: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  return _.filePath.replace(_.fileUploadFolder, _.publicStaticImageFolder)
}
