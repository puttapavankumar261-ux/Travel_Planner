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

export default {
    login,
    register,
};