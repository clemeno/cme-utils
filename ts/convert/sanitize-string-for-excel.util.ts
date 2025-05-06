export const SANITIZE_STRING_FOR_EXCEL = (s: string): string => {
  return s.normalize('NFKD').replace(/[^\w\s-,_!?[\](){};'"<>.@|\\/]+/gi, '').replace(/[\n\t\s]+/gi, ' ')
}
