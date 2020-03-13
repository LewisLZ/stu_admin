import * as R from 'ramda'
// import { dateFormat } from '../../util/format'

export const covertStudentForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'sex' || key === 'class_id') {
      return parseInt(val)
    }
    // else if (key === 'birthday') {
    //   const v = parseInt(val)
    //   if (v === 0) {
    //     return ''
    //   } else {
    //     return dateFormat(v, 'YYYY-MM-DD')
    //   }
    // } else if (key === 'intake_time') {
    //   const v = parseInt(val)
    //   if (v === 0) {
    //     return ''
    //   } else {
    //     return dateFormat(v, 'YYYY-MM')
    //   }
    // }
    return val
  })(data)
})
