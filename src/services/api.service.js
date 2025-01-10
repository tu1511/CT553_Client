import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const rootURL = "http://localhost:5000/api/v1";

console.log(rootURL);

const createApiClient = (path) => {
  const baseURL = `${rootURL}${path}`;
  const api = axios.create({
    baseURL: baseURL,
    ...commonConfig,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const refreshToken = localStorage.getItem("refreshToken");

      if (
        error.response.data.error === "Token expired!" &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(`${rootURL}/auth/refresh`, {
            refreshToken: refreshToken,
          });

          // console.log("Làm mới token thành công:", response.data);

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          if (
            refreshError.response &&
            refreshError.response.data.error === "Token expired!"
          ) {
            // localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error.response);
    }
  );

  return api;
};

export default createApiClient;
