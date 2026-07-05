import axios from "axios";

// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// =============================
// Request Interceptor
// =============================

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =============================
// Response Interceptor
// =============================

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Please login again.");

      // Remove invalid token
      localStorage.removeItem("token");

      // Later we can redirect to Login page
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;