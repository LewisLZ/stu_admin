export const convertYuanToFen = (yuan) => {
  return parseFloat(yuan).mul(100)
}

export const convertFenToYuan = (fen) => {
  return parseFloat(fen).div(100)
}

export const convertYuanToFenNoZero = (yuan) => {
  return Math.round(parseFloat(yuan) * 100)
}

export const convertFenToYuanNoZero = (fen) => {
  return Math.round(parseFloat(fen)) / 100
}

export const checkIsMoney = (val) => {
  let re = /^(([1-9][0-9]*)|[0-9])(\.[0-9]{1,2})?$/
  if (!re.test(val)) {
    return false
  }
  return true
}

export const getShowPrice = (num) => {
  let val = num * 1.0 / 100
  if (val < 10000) {
    return `¥${val}`
  } else if (val > 100000000) {
    return `¥${(val / 100000000).toFixed(2)}亿`
  } else {
    return `¥${(val / 10000).toFixed(2)}万`
  }
}
