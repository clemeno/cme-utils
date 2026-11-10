/** Mimic the luxon `Settings` class: the locale and timezone utils read and set these, pass `Settings` of 'luxon' */
export interface AppLuxonSettings {
  defaultLocale: string
  get defaultZone (): { readonly name: string }
  /** luxon turns the IANA name into a zone */
  set defaultZone (zone: string)
}
