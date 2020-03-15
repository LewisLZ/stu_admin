import * as R from 'ramda'
import { convertYuanToFen } from '../../util/moneyUtil'
import { dateFormat } from '../../util/format'

export const covertAchievementScoreForm = R.curry((data) => {
  return R.map(item => {
    return R.mapObjIndexed((val, key) => {
      if (key === 'score') {
        if (val === '') {
          return 0
        }
        return convertYuanToFen(val)
      }
      return val
    })(item)
  })(data)
})

export const coverAchievementListSearchScoreForm = R.curry((data) => {
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
