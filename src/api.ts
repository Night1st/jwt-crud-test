import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://dev.thabicare.zenix.com.vn/api/v1", // Replace with your API base URL
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;