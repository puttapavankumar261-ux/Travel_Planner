import axiosInstance from "../utils/axiosInstance";

const getTrips = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(
    `/api/trips?page=${page}&size=${size}`
  );

  return response.data.data;
};

// New function for Dashboard
const getTripsByUser = async (userId) => { 
  const response = await axiosInstance.get(`/api/trips/user/${userId}`);

  return response.data.data;
};

// Get trip by id
const getTripById = async (id) => {
  const response = await axiosInstance.get(`/api/trips/${id}`);
  return response.data.data;
};

// Get user by id
const getUserById = async (userId) => {
  const response = await axiosInstance.get(`/api/users/${userId}`);
  return response.data.data;
};

export default {
  getTrips,
  createTrip,
  getTripById,
  getUserById
};