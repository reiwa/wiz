export const createRandomValue = (value: number, n: number) => {
  return value + Math.floor(Math.random() * (1 + n))
}
