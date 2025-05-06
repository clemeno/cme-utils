import type { Settings } from 'luxon'
import { GET_LOCALE } from './get-locale.util.js'
import { SET_GEO } from './set-geo.util.js'

export const GET_GEO = (_Settings: typeof Settings): string => {
  let geo = ''

  try { geo = document.documentElement.getAttribute('geo') ?? '' } catch {}

  if (geo.length < 1) {
    const geo = GET_LOCALE(_Settings).split('-').slice(1).join('-')

    SET_GEO(geo)
  }

  return geo
}
