import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8080",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
