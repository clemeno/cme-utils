/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`filename` -> ./uploads/`filename` */
export const GET_FILE_PATH_FROM_SYMLINK_PATH = (_: {
  symlinkPath: string
  publicStaticImageFolder: string
  fileUploadFolder: string
}): string => {
  return _.symlinkPath.replace(_.publicStaticImageFolder, _.fileUploadFolder)
}
