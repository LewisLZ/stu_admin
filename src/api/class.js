import Axios from 'axios'

export const createClass = (params) => {
  return Axios.post('/sys/class/create', params)
}

export const updateClass = (params) => {
  return Axios.post('/sys/class/update', params)
}

export const listClass = (params) => {
  return Axios.get('/sys/class/list', { params })
}

export const deleteClass = (params) => {
  return Axios.delete('/sys/class/delete', { params })
}

export const listClassNameByIds = (cids) => {
  const params = { ids: cids }
  return Axios.get('/sys/class/listNameByIds', { params })
}
