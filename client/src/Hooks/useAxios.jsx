import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });
  }, []);
  return axiosInstance;
};

export default useAxios;
