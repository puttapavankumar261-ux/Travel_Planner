import axiosInstance from "../utils/axiosInstance";

const getUsers = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(
    `/api/users?page=${page}&size=${size}`
  );

  return response.data.data;
};

const createUser = async (user) => {
  const response = await axiosInstance.post("/api/users", user)

  return response.data.data;
};

const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`/api/users/${userId}`);
    console.log(response);
    return response.data;
};

// Get user by id
const getUserById = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data.data;
};

const addUser = async (user) => {
    const response = await axiosInstance.post("/api/users", user);
    return response.data.data;
};

export default {
  getUsers,
  getUserById,
  addUser,
  createUser,
  deleteUser
};