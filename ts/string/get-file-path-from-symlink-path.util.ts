/**
 * Converts the static symlink path of a file into its upload path, by swapping the folder.
 * @param _ - The object parameter
 * @param _.symlinkPath - The path of the symlink in the public static image folder
 * @param _.publicStaticImageFolder - The public static image folder
 * @param _.fileUploadFolder - The upload folder
 * @returns The path with the public static image folder replaced by the upload folder
 * @example
 * ```typescript
 * GET_FILE_PATH_FROM_SYMLINK_PATH({ symlinkPath: '/static/a.png', publicStaticImageFolder: '/static', fileUploadFolder: './uploads' }) // returns './uploads/a.png'
 * GET_FILE_PATH_FROM_SYMLINK_PATH({ symlinkPath: '/other/a.png', publicStaticImageFolder: '/static', fileUploadFolder: './uploads' }) // returns '/other/a.png'
 * ```
 */
export function GET_FILE_PATH_FROM_SYMLINK_PATH (_: {
  symlinkPath: string
  publicStaticImageFolder: string
  fileUploadFolder: string
}): string {
  return _.symlinkPath.replace(_.publicStaticImageFolder, _.fileUploadFolder)
}
