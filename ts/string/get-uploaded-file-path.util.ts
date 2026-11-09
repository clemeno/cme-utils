/**
 * Builds the upload path of a file: the upload folder followed by `filename`.
 * @param _ - The object parameter
 * @param _.filename - The name of the file
 * @param _.fileUploadFolder - The upload folder, with or without a trailing /
 * @returns The upload path of the file
 * @example
 * ```typescript
 * GET_UPLOADED_FILE_PATH({ filename: 'a.png', fileUploadFolder: './uploads' }) // returns './uploads/a.png'
 * GET_UPLOADED_FILE_PATH({ filename: 'a.png', fileUploadFolder: './uploads/' }) // returns './uploads/a.png'
 * ```
 */
export function GET_UPLOADED_FILE_PATH (_: { filename: string, fileUploadFolder: string }): string {
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${_.filename}`
}
