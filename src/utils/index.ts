export const moveElement = <T>(
  arr: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  if (
    startIndex < 0 ||
    startIndex >= arr.length ||
    endIndex < 0 ||
    endIndex >= arr.length
  ) {
    throw new Error('Start or end index is out of bounds')
  }

  const [element] = arr.splice(startIndex, 1)

  arr.splice(endIndex, 0, element)

  return arr
}
