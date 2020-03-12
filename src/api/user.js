import Axios from 'axios'

export const createUser = (params) => {
  return Axios.post('/bac/user/create', params)
}

export const updateUser = (params) => {
  return Axios.post('/bac/user/update', params)
}

export const listUsers = (params) => {
  return Axios.get('/bac/user/list', { params })
}

export const getUserByID = (params) => {
  return Axios.get('/bac/user/get', { params })
}

export const resetPwd = (params) => {
  return Axios.post('/bac/user/reset_pwd', params)
}

export const updatePwd = (params) => {
  return Axios.post('/bac/user/update_pwd', params)
}
