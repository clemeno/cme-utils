export const IGNORE_DUPLICATES = (on: (element: any) => any): (elem: any) => boolean => {
  const already = new Set()

  return element => {
    const value = on(element)
    const bNew = !already.has(value)

    if (bNew) {
      already.add(value)
    }

    return bNew
  }
}
