/**
 * Converts the upload path of a file into its static symlink path, by swapping the folder.
 * @param _ - The object parameter
 * @param _.filePath - The path of the file in the upload folder
 * @param _.fileUploadFolder - The upload folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @returns The path with the upload folder replaced by the public static image folder
 * @example
 * ```typescript
 * GET_SYMLINK_PATH_FROM_FILE_PATH({ filePath: './uploads/a.png', fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }) // returns '/static/a.png'
 * GET_SYMLINK_PATH_FROM_FILE_PATH({ filePath: '/other/a.png', fileUploadFolder: './uploads', publicStaticImageFolder: '/static' }) // returns '/other/a.png'
 * ```
 */
export function GET_SYMLINK_PATH_FROM_FILE_PATH (_: {
  filePath: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string {
  return _.filePath.replace(_.fileUploadFolder, _.publicStaticImageFolder)
}
