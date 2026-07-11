import axiosInstance from "../utils/axiosInstance";

const login = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);

  return response.data;
};

const register = async (userData) => {
  const response = await axiosInstance.post("/api/users", userData);
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
