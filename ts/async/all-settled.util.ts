/**
 * @description
 * This function takes an array of async and returns a promise that resolves when all of the promises have either resolved or rejected.
 * It returns an object containing two arrays: one for fulfilled promises and one for rejected promises.
 *
 * @param todoInParallel - An array of tasks to be executed in parallel.
 * @returns A promise that resolves to an object containing two arrays: `fullfiled` and `rejected`.
 */
export const ALL_SETTLED = async <T = any, Reason = any> (
  todoInParallel: Iterable<T | PromiseLike<T>>
): Promise<{ fullfiled: T[], rejected: Reason[], size: number }> => {
  const allSettledList = await Promise.allSettled(todoInParallel)

  const fullfiled: T[] = []
  const rejected: Reason[] = []

  for (const settled of allSettledList) {
    if (settled.status === 'fulfilled') {
      fullfiled.push(settled.value)
    } else {
      rejected.push(settled.reason)
    }
  }

  const size = fullfiled.length + rejected.length

  return { fullfiled, rejected, size }
}
