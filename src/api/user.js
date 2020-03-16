import Axios from 'axios'

export const resetPwd = (params) => {
  return Axios.post('/bac/user/reset_pwd', params)
}

export const updatePwd = (params) => {
  return Axios.post('/bac/user/update_pwd', params)
}

export const listUser = (params) => {
  return Axios.get(`/sys/user/list`, { params })
}

export const createUser = (params) => {
  return Axios.post(`/sys/user/create`, params)
}

export const updateUser = (params) => {
  return Axios.post(`/sys/user/update`, params)
}

export const deleteUser = (params) => {
  return Axios.delete('/sys/user/delete', { params })
}
