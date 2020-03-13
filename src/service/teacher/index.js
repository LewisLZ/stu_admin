import * as R from 'ramda'

export const covertListTeacherForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'sex') {
      return parseInt(val)
    }
    return val
  })(data)
})
