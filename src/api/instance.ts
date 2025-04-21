import { useAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const tryRefreshToken = async (originalError: AxiosError) => {
  // console.log("trying to get a new token");
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    window.location.href = "/login";
    return Promise.reject(originalError);
  }

  try {
    const { data: credentials } = await axiosInstance.post("/users/refresh/", {
      refresh_token: refreshToken,
    });

    // console.log("new token!", credentials.access_token);

    useAuthStore
      .getState()
      .setTokens(credentials.access_token, credentials.refresh_token);

    const originalRequest = originalError.config;
    originalRequest.headers.Authorization = `Bearer ${credentials.access_token}`;

    return axiosInstance(originalRequest);
  } catch (error) {
    useAuthStore.getState().setTokens(null, null);
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error);
    const status = error.response?.status;
    if (status === 401) {
      return tryRefreshToken(error);
    }

    return Promise.reject(error);
  }
);
