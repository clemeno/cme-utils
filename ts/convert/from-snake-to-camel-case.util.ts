import { FROM_SNAKE_TO_CLASS_CASE } from './from-snake-to-class-case.util.js'

export const FROM_SNAKE_TO_CAMEL_CASE = (s: string): string => {
  const classS = FROM_SNAKE_TO_CLASS_CASE(s)
  return `${classS[0]?.toLowerCase() ?? ''}${classS.slice(1)}`
}
