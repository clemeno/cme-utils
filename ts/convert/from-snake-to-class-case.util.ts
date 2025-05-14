export const FROM_SNAKE_TO_CLASS_CASE = (s: string): string => {
  return s.split('_').map(subS => `${subS[0]?.toUpperCase() ?? ''}${subS.slice(1).toLowerCase()}`).join('')
}
