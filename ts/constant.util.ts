/** a string, standard from base 1 to 62, then composed of random utf8 characters to serialize any `Buffer` into `string` */
export const SYMBOLS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅ♪ÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ⛱⛵ÙÚÛÜÝÞßàáâãäå♩çèéê☯ìí☸ïðñòóôõö♭øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđ☺ēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥ✈ħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐő♫♬ŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž⛟⛳☮'

/** a base 256 made from the first characters of `SYMBOLS` */
export const SYMBOLS_BASE_256 = SYMBOLS.slice(0, 256)

/** the count of available characters in `SYMBOLS` */
export const SYMBOLS_LENGTH = SYMBOLS.length

/** validate a hexadecimal `string` representation or `''` */
export const REGEX_HEX_INT_OR_EMPTY = /^-?[0-9a-fA-F]*$/

/** validate a hexadecimal `string` representation and not empty */
export const REGEX_HEX_INT_AND_NOT_EMPTY = /^-?[0-9a-fA-F]+$/

/** validate a decimal `string` representation or `''` */
export const REGEX_DEC_INT_OR_EMPTY = /^-?[0-9]*$/

/** validate a decimal `string` representation and not empty */
export const REGEX_DEC_INT_AND_NOT_EMPTY = /^-?[0-9]+$/
