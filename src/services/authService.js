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

const register = async (registerData) => {

    const response = await axiosInstance.post(
        "/api/auth/register",
        registerData
    );

    return response.data;
};

export default {
    login,
    register,
};