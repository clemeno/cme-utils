/**
 * @description
 * This function takes an array of async and returns a promise that resolves when all of the promises have either resolved or rejected.
 * It returns an object containing two arrays: one for fulfilled promises and one for rejected promises.
 *
 * @param todoInParallel - An array of tasks to be executed in parallel.
 * @returns A promise that resolves to an object containing the `fulfilled` and `rejected` results clearly separated.
 */
export const ALL_SETTLED = async <const T extends readonly unknown[], Reason = any> (todoInParallel: T): Promise<{
  fulfilled: { [K in keyof T]?: Awaited<T[K]> }
  rejected: { [K in keyof T]?: Reason }
  fulfilledSize: number
  rejectedSize: number
  size: number
}> => {
  const allSettledList = await Promise.allSettled(todoInParallel)

  const fulfilled: { [K in keyof T]?: Awaited<T[K]> } = {}
  let fulfilledSize = 0

  const rejected: { [K in keyof T]?: Reason } = {}
  let rejectedSize = 0

  for (const [index, settled] of allSettledList.entries()) {
    const i: keyof T = index

    if (settled.status === 'fulfilled') {
      fulfilled[i] = settled.value as Awaited<T[typeof i]>

      fulfilledSize += 1
    } else {
      rejected[i] = settled.reason as Reason

      rejectedSize += 1
    }
  }

  const size = fulfilledSize + rejectedSize

  return { fulfilled, rejected, fulfilledSize, rejectedSize, size }
}
