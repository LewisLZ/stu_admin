import * as R from 'ramda'
import { dateFormat } from '../../util/format'

export const covertExaminationForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'start_time') {
      if (val === '') {
        return 0
      }
      return dateFormat(val, 'YYYY-MM-DD')
    }
    return val
  })(data)
})

export const covertExaminationListForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'start_time' || key === 'end_time') {
      const v = parseInt(val)
      if (v === 0) {
        return ''
      }
      return dateFormat(v, 'YYYY-MM-DD')
    }
    return val
  })(data)
})
