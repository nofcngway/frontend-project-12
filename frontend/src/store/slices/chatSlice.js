import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
      if (state.currentChannelId === null && action.payload.length > 0) {
        state.currentChannelId = action.payload[0].id
      }
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    addNewChannel: (state, action) => {
      state.channels.push(action.payload)
    },
    removeChannel: (state, action) => {
      const channelId = action.payload
      state.channels = state.channels.filter(channel => channel.id !== channelId)
      state.messages = state.messages.filter(message => message.channelId !== channelId)
      if (state.currentChannelId === channelId) {
        state.currentChannelId = '1'
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      const channel = state.channels.find(channel => channel.id === id)
      if (channel) {
        channel.name = name
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
})

export const {
  setChannels,
  setCurrentChannel,
  addNewChannel,
  setMessages,
  addMessage,
  removeChannel,
  renameChannel,
} = chatSlice.actions
export default chatSlice.reducer
