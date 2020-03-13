import * as R from 'ramda'
import { dateFormat, yearToTmp } from '../../util/format'

export const allPos = {
  all: {
    value: 0,
    text: '全部'
  },
  up: {
    value: 1,
    text: '上半年'
  },
  down: {
    value: 2,
    text: '下半年'
  }
}

export const covertSchoolYearForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'pos' || key === 'id') {
      return parseInt(val)
    } else if (key === 'year') {
      const v = parseInt(val)
      if (v === 0) {
        return ''
      } else {
        return dateFormat(v, 'YYYY')
      }
    }
    return val
  })(data)
})

export const covertSchoolYearData = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'year') {
      return yearToTmp(val)
    }
    return val
  })(data)
})
