import Vue from 'vue'
import { UPDATE_ME } from 'src/store/types'
import Axios from 'axios'

export const login = (params) => {
  return Axios.post(`/pub/login`, params).then(async res => {
    Vue.$store.commit(UPDATE_ME, res.data)
    return res
  })
}

export const uc = () => {
  return Axios.get(`sys/user/uc`, { ignoreError: true }).then(async res => {
    Vue.$store.commit(UPDATE_ME, res.data)
    return res
  })
}

export const updatePwd = (params) => {
  return Axios.post('/sys/user/update_pwd', params)
}
