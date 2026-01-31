import axios from 'axios'
import i18n from 'i18next'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  (error) => {
    if (!error.response) {
      toast.error(i18n.t('errors.network'))
    }

    return Promise.reject(error)
  },
)

export default api
