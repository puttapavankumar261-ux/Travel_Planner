import axiosInstance from "../utils/axiosInstance";

const addCompanion = async (tripId, companionData) => {
  const response = await axiosInstance.post(
    `/api/trips/${tripId}/companions`,
    companionData
  );

  return response.data.data;
};

const getCompanions = async (tripId) => {
  const response = await axiosInstance.get(
    `/api/trips/${tripId}/companions`
  );


    console.log("API Response:", response.data);

    return response.data?.data || response.data || [];
};

const getSavedTravellers = async (tripId, userId) => {
  const response = await axiosInstance.get(
    `/api/trips/${tripId}/companions/user/${userId}`
  );

  return response.data.data;
};


export default {
  addCompanion,
  getCompanions,
  getSavedTravellers
 
};