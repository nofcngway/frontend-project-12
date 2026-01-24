import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
      if (state.currentChannelId === null && action.payload.length > 0) {
        state.currentChannelId = action.payload[0].id;
      }
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setChannels,
  setCurrentChannel,
  setMessages,
  addMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
