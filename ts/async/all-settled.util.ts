/**
 * @description
 * This function takes an array of async and returns a promise that resolves when all of the promises have either resolved or rejected.
 * It returns an object containing two arrays: one for fulfilled promises and one for rejected promises.
 *
 * @param todoInParallel - An array of tasks to be executed in parallel.
 * @returns A promise that resolves to an object containing the `fullfiled` and `rejected` results clearly separated.
 */
export const ALL_SETTLED = async <T = any, Reason = any> (
  todoInParallel: Iterable<T>
): Promise<{
  fullfiled: Record<string, Awaited<T>>
  rejected: Record<string, Reason>
  fullfiledSize: number
  rejectedSize: number
  size: number
}> => {
  const allSettledList = await Promise.allSettled(todoInParallel)

  const fullfiled: Record<string, Awaited<T>> = {}
  let fullfiledSize = 0

  const rejected: Record<string, Reason> = {}
  let rejectedSize = 0

  for (const [index, settled] of allSettledList.entries()) {
    const i = index.toString()

    if (settled.status === 'fulfilled') {
      fullfiled[i] = settled.value

      fullfiledSize += 1
    } else {
      rejected[i] = settled.reason

      rejectedSize += 1
    }
  }

  const size = fullfiledSize + rejectedSize

  return { fullfiled, rejected, fullfiledSize, rejectedSize, size }
}
