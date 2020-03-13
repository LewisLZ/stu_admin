import * as R from 'ramda'
import { dateFormat } from '../../util/format'

export const covertClassData = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'school_year_id') {
      if (val === '') {
        return 0
      }
      return parseInt(val)
    }
    return val
  })(data)
})

export const covertClassCurriculumData = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'pos' || key === 'class_id') {
      if (val === '') {
        return 0
      }
      return parseInt(val)
    }
    if (key === 'year') {
      if (val === '') {
        return ''
      }
      return dateFormat(val, 'YYYY')
    }
    return val
  })(data)
})
