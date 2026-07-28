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

// const sendOtp = async (otp) => {

//     const response = await axiosInstance.post(
//         "/api/auth/send",
//         otp
//     );

//     return response.data;
// };

const sendOtp = async (email) => {

    const response = await axiosInstance.post(
        "/api/otp/send",
        {
           "email" : email,
            "purpose":"REGISTRATION"
        }
    );

    return response.data;
};

// const verifyOtp = async (otp) => {

//     const response = await axiosInstance.post(
//         "/api/auth/verify",
//         otp
//     );

//     return response.data;
// };

const verifyOtp = async (email, otp) => {

    const response = await axiosInstance.post(
        "/api/otp/verify",
        {
            "email":email,
            "otp": otp,
            "purpose": "REGISTRATION"
        }
    );

    return response.data;
};


export default {
    login,
    register,
    sendOtp,
    verifyOtp
};