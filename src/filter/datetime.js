import { dateFormat } from 'src/util/format'

export const date = value => {
  return dateFormat(value, 'YYYY-MM-DD')
}

export const datetime = value => {
  return dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
}

export const monthtime = value => {
  return dateFormat(value, 'MM月DD日 HH:mm:ss')
}

export const minutetime = value => {
  return dateFormat(value, 'MM月DD日 HH:mm')
}

export const currDay = value => {
  let d = new Date(value)
  let date = new Date((d.setHours(0, 0, 0, 0)))
  return dateFormat(date.getTime(), 'YYYY-MM-DD HH:mm:ss')
}

export const endOfDay = value => {
  let d = new Date(value)
  let date = new Date((d.setHours(23, 59, 59, 0)))
  return dateFormat(date.getTime(), 'YYYY-MM-DD HH:mm:ss')
}
