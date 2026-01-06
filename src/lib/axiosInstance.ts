import axios from "axios";

// const isLocalhost = window.location.hostname === "localhost";

const axiosInstance = axios.create({
  // baseURL: "https://neiea-backend.vercel.app", // Production URL - main branch
  // baseURL:"https://neiea-backend-dev.vercel.app", // Development URL - tauhid-dev branch
  baseURL: "https://neiea-backend-v2.vercel.app/", 
  //baseURL: "http://localhost:5000",
  // baseURL: isLocalhost
  //   ? "http://localhost:5000"
  //   : "https://neiea-backend-v2.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});




// Add a request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      // Correct way: mutate headers, don’t replace
      config.headers.set
        ? config.headers.set("Authorization", `Bearer ${token}`)
        : (config.headers["Authorization"] = `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
