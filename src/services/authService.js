import axiosInstance from "../utils/axiosInstance";
import axios from 'axios'; 
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const login = async (loginData) => {

    const response = await axiosInstance.post(
        "/api/auth/login",
        loginData
    );

    return response.data;
};
const sendOtp = async (otpData) => {
  const response = await axiosInstance.post("/api/otp/send", otpData);
  return response.data;
};

const verifyOtp = async (otpData) => {
  const response = await axiosInstance.post("/api/otp/verify", otpData);
  return response.data;
};
const register = async (registerData) => {

    const response = await axiosInstance.post(
        "/api/auth/register",
        registerData
    );

    return response.data;
};

const authService = {
  login,
  register,
  sendOtp,
  verifyOtp,
};

export default authService;