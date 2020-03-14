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

export const covertClassCurriculumYearForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'pos' || key === 'class_id') {
      if (val === '') {
        return 0
      }
      return parseInt(val)
    }
    if (key === 'year') {
      const v = parseInt(val)
      if (v === 0) {
        return ''
      }
      return dateFormat(v, 'YYYY')
    }
    return val
  })(data)
})

export const covertClassCurriculumForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'cc_year_id') {
      if (val === '') {
        return 0
      }
      return parseInt(val)
    }
    return val
  })(data)
})
