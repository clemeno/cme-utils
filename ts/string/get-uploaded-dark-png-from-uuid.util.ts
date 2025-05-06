import { GET_DARK_PNG_NAME_FROM_UUID } from './get-dark-png-name-from-uuid.util.js'

/** @returns {string} ./uploads/`uuid`_dark.png */
export const GET_UPLOADED_DARK_PNG_FROM_UUID = (_: { uuid: string, fileUploadFolder: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}
