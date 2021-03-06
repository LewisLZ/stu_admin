import Axios from 'axios'
import { covertListTeacherForm } from '../service/teacher'

export const createTeacher = (params) => {
  return Axios.post('/sys/teacher/create', params)
}

export const updateTeacher = (id, params) => {
  params.id = parseInt(id)
  return Axios.post('/sys/teacher/update', params)
}

export const listTeacher = (data) => {
  const params = covertListTeacherForm(data)
  return Axios.get('/sys/teacher/list', { params })
}

export const getTeacher = (params) => {
  return Axios.get('/sys/teacher', { params })
}

export const deleteTeacher = (params) => {
  return Axios.delete('/sys/teacher/delete', { params })
}
