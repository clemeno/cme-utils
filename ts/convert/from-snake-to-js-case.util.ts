import { FROM_SNAKE_TO_CAMEL_CASE } from './from-snake-to-camel-case.util.js'

export const FROM_SNAKE_TO_JS_CASE = (s: string): string => {
  const bUnderscoreStart = '_' === s[0]
  const camelS = FROM_SNAKE_TO_CAMEL_CASE(s)
  return bUnderscoreStart ? `_${camelS[0]?.toLowerCase() ?? ''}${camelS.slice(1)}` : camelS
}
