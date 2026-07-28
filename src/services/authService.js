import axiosInstance from "../utils/axiosInstance";

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

const checkEmail = async (email) => {

    const response = await axiosInstance.post(
        "/api/auth/check-email",
        {
            email,
        }
    );

    return response.data;
};
export default {
    login,
    register,
    sendOtp,
    verifyOtp,
    checkEmail
};