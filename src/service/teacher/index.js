import * as R from 'ramda'

export const allSex = {
  all: {
    value: 0,
    text: '全部'
  },
  boy: {
    value: 1,
    text: '男'
  },
  girl: {
    value: 2,
    text: '女'
  }
}

export const covertListForm = R.curry((data) => {
  return R.mapObjIndexed((val, key) => {
    if (key === 'sex') {
      return parseInt(val)
    }
    return val
  })(data)
})

// export const covertListForm = R.curry((data) => {
//   return R.mapObjIndexed((val, key) => {
//     if (key === 'startTime' || key === 'endTime') {
//       if (val === 0) {
//         return ''
//       } else {
//         return dateFormat(val)
//       }
//     } else if (key === 'month') {
//       if (val === 0) {
//         return ''
//       } else {
//         return dateFormat(val, 'YYYY-MM')
//       }
//     }
//     return val
//   })(data)
// })
