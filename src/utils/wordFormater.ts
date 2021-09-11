export const wordFormater = (word: string, count: number): string => {
  if (count > 1) {
    return `${count} ${word}s`
  } else {
    return `${count} ${word}`
  }
}
