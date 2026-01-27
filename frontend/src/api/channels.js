import api from "./index.js";

export const getChannels = async () => {
  const response = await api.get("/channels");
  return response.data;
};

export const addChannel = async (chanel) => {
  const response = await api.post("/channels", chanel);
  return response.data;
};

export const editChannel = async (id, chanel) => {
  const response = await api.patch(`/channels/${id}`, chanel);
  return response.data;
};

export const removeChannel = async (id) => {
  const response = await api.delete(`/channels/${id}`);
  return response.data;
}
