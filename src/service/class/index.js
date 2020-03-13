import * as R from 'ramda'

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
