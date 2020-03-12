export const sales = (num, showSymbol = true) => {
  if (num) {
    return num
  }
  return `${showSymbol ? 0 : '0.00%'}`
}
