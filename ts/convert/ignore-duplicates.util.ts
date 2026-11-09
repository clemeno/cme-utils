/**
 * Builds a stateful filter callback that keeps the first element of each distinct `on(element)` value.
 * Use a fresh filter for each array, the memory of seen values is kept in the returned function.
 * @param on - Gets the value that identifies an element
 * @returns A callback for `Array.prototype.filter`, `true` the first time a value is seen
 * @example
 * ```typescript
 * [{ id: 1 }, { id: 1 }, { id: 2 }].filter(IGNORE_DUPLICATES(x => x.id)) // returns [{ id: 1 }, { id: 2 }]
 * [].filter(IGNORE_DUPLICATES(x => x)) // returns []
 * ```
 */
export function IGNORE_DUPLICATES (on: (element: any) => any): (elem: any) => boolean {
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
