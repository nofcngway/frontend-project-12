import api from "./index.js";

export const loginUser = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

export const signupUser = async (username, password) => {
  const response = await api.post("/signup", { username, password} );
  return response.data;
}
