import Axios from 'axios'

export const createStudent = (params) => {
  return Axios.post('/sys/student/create', params)
}

export const updateStudent = (id, params) => {
  params.id = id
  return Axios.post('/sys/student/update', params)
}

export const listStudent = (params) => {
  return Axios.get('/sys/student/list', { params })
}

export const getStudent = (params) => {
  return Axios.get('/sys/student', { params })
}

export const deleteStudent = (params) => {
  return Axios.delete('/sys/student/delete', { params })
}
