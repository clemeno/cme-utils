import { FROM_JS_TO_SNAKE_CASE } from './from-js-to-snake-case.util.js'

export const FROM_JS_TO_CONSTANT_CASE = (s: string): string => {
  return FROM_JS_TO_SNAKE_CASE(s).toUpperCase()
}
