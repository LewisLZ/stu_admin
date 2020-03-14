import Axios from 'axios'
import {
  covertExaminationClassCreateForm,
  covertExaminationForm,
  covertExaminationListForm
} from '../service/examination'

export const createExamination = (data) => {
  const params = covertExaminationForm(data)
  return Axios.post('/sys/examination/create', params)
}

export const updateExamination = (data) => {
  const params = covertExaminationForm(data)
  return Axios.post('/sys/examination/update', params)
}

export const deleteExamination = (params) => {
  return Axios.delete('/sys/examination/delete', { params })
}

export const listExamination = (data) => {
  const params = covertExaminationListForm(data)
  return Axios.get('/sys/examination/list', { params })
}

export const createExaminationClass = (data) => {
  const params = covertExaminationClassCreateForm(data)
  return Axios.post('/sys/examination/class/create', params)
}

export const deleteExaminationClass = (params) => {
  return Axios.delete('/sys/examination/class/delete', { params })
}

export const listExaminationClass = (params) => {
  return Axios.get('/sys/examination/class/list', { params })
}

export const createExaminationClassCurriculum = (params) => {
  return Axios.post('/sys/examination/classcurriculum/create', params)
}
