import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
