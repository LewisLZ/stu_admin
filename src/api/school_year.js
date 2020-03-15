import Axios from 'axios'
import { covertSchoolYearForm } from '../service/school_year'

export const createSchoolYear = (data) => {
  const params = covertSchoolYearForm(data)
  return Axios.post('/sys/schoolyear/create', params)
}

export const updateSchoolYear = (data) => {
  const params = covertSchoolYearForm(data)
  return Axios.post('/sys/schoolyear/update', params)
}

export const listSchoolYear = (data) => {
  const params = covertSchoolYearForm(data)
  return Axios.get('/sys/schoolyear/list', { params })
}

export const deleteSchoolYear = (params) => {
  return Axios.delete('/sys/schoolyear/delete', { params })
}
