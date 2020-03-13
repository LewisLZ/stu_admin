import Axios from 'axios'
import { covertSchoolYearForm } from '../service/school_year'
import { covertClassCurriculumForm, covertClassCurriculumYearForm, covertClassData } from '../service/class'

export const createClass = (data) => {
  const params = covertClassData(data)
  return Axios.post('/sys/class/create', params)
}

export const updateClass = (data) => {
  const params = covertClassData(data)
  return Axios.post('/sys/class/update', params)
}

export const getClass = (params) => {
  return Axios.get('/sys/class', { params })
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

export const listClassCurriculumYear = (params) => {
  return Axios.get('/sys/classcurriculum/year/list', { params })
}

export const createClassCurriculumYear = (data) => {
  const params = covertClassCurriculumYearForm(data)
  return Axios.post('/sys/classcurriculum/year/create', params)
}

export const updateClassCurriculumYear = (data) => {
  const params = covertClassCurriculumYearForm(data)
  return Axios.post('/sys/classcurriculum/year/update', params)
}

export const deleteClassCurriculumYear = (params) => {
  return Axios.delete('/sys/classcurriculum/year/delete', { params })
}

export const createClassCurriculum = (data) => {
  const params = covertClassCurriculumForm(data)
  return Axios.post('/sys/classcurriculum/create', params)
}
