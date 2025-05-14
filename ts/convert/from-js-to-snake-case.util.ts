export const FROM_JS_TO_SNAKE_CASE = (s: string): string => {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}
