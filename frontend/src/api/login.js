import axios from "axios";

export const loginUser = async (username, password) => {
  const response = await axios.post("/api/v1/login", {username, password})
  localStorage.setItem("token", response.data.token);

  return response.data;
};
