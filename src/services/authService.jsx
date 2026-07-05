import axiosInstance from "./axiosInstance";

const login = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);

  return response.data;
};

const authService = {
  login,
};

export default authService;
