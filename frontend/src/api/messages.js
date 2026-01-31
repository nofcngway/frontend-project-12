import api from './index.js'

export const getMessages = async () => {
  const response = await api.get('/messages')
  return response.data
}

export const addMessage = async (message) => {
  const response = await api.post('/messages', message)
  return response.data
}

export const editMessage = async (id, message) => {
  const response = await api.patch(`/messages/${id}`, message)
  return response.data
}

export const removeMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`)
  return response.data
}
