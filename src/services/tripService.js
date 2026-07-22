import axiosInstance from "../utils/axiosInstance";

const getTrips = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(
    `/api/trips?page=${page}&size=${size}`
  );

  return response.data.data;
};

export default {
  getTrips,
};