import Axios from 'axios'
import { covertExaminationListForm } from '../service/examination'
import { coverAchievementListSearchScoreForm, covertAchievementScoreForm } from '../service/achievement'

export const listAchievement = (data) => {
  const params = covertExaminationListForm(data)
  return Axios.get('/sys/achievement/list', { params })
}

export const listAchievementScore = (params) => {
  return Axios.get('/sys/achievement/listsocre', { params })
}

export const listAchievementSearchScore = (data) => {
  const params = coverAchievementListSearchScoreForm(data)
  return Axios.get('/sys/achievement/listsearchsocre', { params })
}

export const listAchievementStudentScore = (params) => {
  return Axios.get('/sys/achievement/liststudentscore', { params })
}

export const listAchievementCurriculumScore = (params) => {
  return Axios.get('/sys/achievement/listcurriculumscore', { params })
}

export const listAchievementClassScore = (params) => {
  return Axios.get('/sys/achievement/listclassscore', { params })
}

export const saveAchievementScore = (data) => {
  const params = covertAchievementScoreForm(data)
  return Axios.post('/sys/achievement/savesocre', params)
}

export const archivedAchievement = (params) => {
  return Axios.post('/sys/achievement/archived', params)
}
