import Axios from 'axios'
import { covertExaminationForm, covertExaminationListForm } from '../service/examination'

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
