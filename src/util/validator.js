import Vue from 'vue'

export const nonZeroIntegerValidator = (rule, value, callback) => {
  if (!Vue.R_.isInteger(value)) {
    callback(new Error('请输入正整数'))
    return
  }
  const i = parseInt(value)
  if (i < 0) {
    callback(new Error('不能小于0'))
    return
  } else if (i > 99999) {
    callback(new Error('不能输入大于六位数的数字'))
    return
  }
  callback()
}

export const priceValidator = (rule, value, callback) => {
  if (value && !Vue.R_.isPrice(value)) {
    callback(new Error('请输入正数，最多2位小数'))
    return
  }
  if (value === '0') {
    callback(new Error('请输入正确的价格'))
    return
  }
  if ((value * 100) > 99999999) {
    callback(new Error('输入价格不能大于999999'))
    return
  }
  callback()
}
export const priceValidatorExceptZero = (rule, value, callback) => {
  if (value && !Vue.R_.isPrice(value)) {
    callback(new Error('请输入正数，最多2位小数'))
    return
  }
  if ((value * 100) > 99999999) {
    callback(new Error('输入价格不能大于999999'))
    return
  }
  callback()
}

export const timeValidator = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('不能为空'))
    return
  }
  callback()
}

export const positiveIntegerValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (!Vue.R_.isInteger(value)) {
    callback(new Error('请输入正整数'))
    return
  }
  const i = parseInt(value)
  if (i < 0) {
    callback(new Error('不能小于0'))
  }
  callback()
}
