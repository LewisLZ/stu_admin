import Axios from 'axios'
import { covertSchoolYearForm } from '../service/school_year'
import { covertClassData } from '../service/class'

export const createClass = (data) => {
  const params = covertClassData(data)
  return Axios.post('/sys/class/create', params)
}

export const updateClass = (data) => {
  const params = covertClassData(data)
  return Axios.post('/sys/class/update', params)
}

export const listClass = (data) => {
  const params = covertSchoolYearForm(data)
  return Axios.get('/sys/class/list', { params })
}

export const deleteClass = (params) => {
  return Axios.delete('/sys/class/delete', { params })
}

export const listClassNameByIds = (cids) => {
  const params = { ids: cids }
  return Axios.get('/sys/class/listNameByIds', { params })
}
