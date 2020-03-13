import Axios from 'axios'
import { covertStudentForm } from '../service/student'

export const createStudent = (data) => {
  const params = covertStudentForm(data)
  return Axios.post('/sys/student/create', params)
}

export const updateStudent = (id, data) => {
  const params = covertStudentForm(data)
  params.id = id
  return Axios.post('/sys/student/update', params)
}

export const listStudent = (data) => {
  const params = covertStudentForm(data)
  return Axios.get('/sys/student/list', { params })
}

export const getStudent = (params) => {
  return Axios.get('/sys/student', { params })
}

export const deleteStudent = (params) => {
  return Axios.delete('/sys/student/delete', { params })
}
