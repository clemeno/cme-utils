/** Mimic the luxon `Settings` class: the locale and timezone utils read and set these, pass `Settings` of 'luxon' */
export interface AppLuxonSettings {
  /** luxon starts with `null` (while `@types/luxon` types it `string`), until the app sets one */
  defaultLocale: string | null
  get defaultZone (): { readonly name: string }
  /** luxon turns the IANA name into a zone */
  set defaultZone (zone: string)
}
