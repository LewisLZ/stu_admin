// 转换真实重量
export const commonWeight = (num) => {
  if (num) {
    return parseFloat(num) / 1000
  }
  return ''
}
