/** @returns {string} ./uploads/`filename` */
export const GET_UPLOADED_FILE_PATH = (_: { filename: string, fileUploadFolder: string }): string => {
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${_.filename}`
}
