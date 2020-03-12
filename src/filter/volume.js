function toNonExponential (num) {
  let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}
// 将立方厘米转换成立方米
export const commonVolume = (num) => {
  if (num) {
    return toNonExponential(parseFloat(num).div(1000000000000))
  }
  return ''
}
