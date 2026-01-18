import api from "./index.js";

export const getChannels = async () => {
  const response = await api.get("/channels");
  return response.data;
};

export const addChannel = async () => {
  return null
};

export const editChannel = async () => {
  return null
};

const removeChannel = async () => {
  return null
}
