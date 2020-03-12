import Axios from 'axios'

export const listCurriculum = (params) => {
  return Axios.get('/sys/curriculum/list', { params })
}

export const listCurriculumNameByIds = (ids) => {
  const params = { ids: ids }
  return Axios.get('/sys/curriculum/listNameByIds', { params })
}

export const getCurriculum = (params) => {
  return Axios.get('/sys/curriculum', { params })
}

export const createCurriculum = (params) => {
  return Axios.post('/sys/curriculum/create', params)
}

export const updateCurriculum = (params) => {
  return Axios.post('/sys/curriculum/update', params)
}

export const deleteCurriculum = (params) => {
  return Axios.delete('/sys/curriculum/delete', { params })
}
