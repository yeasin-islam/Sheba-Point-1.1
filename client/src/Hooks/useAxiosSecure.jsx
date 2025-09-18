import { useEffect, useMemo } from "react";
import axios from "axios"; // Ensure this path is correct

const useAxiosSecure = () => {
  // Get user objects and logOut function from your context
  // Memoize the axios instance so it's only created once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL
    });
  }, []);
  // Return the fully configured axios instance
  useEffect(() => {
    // --- Request Interceptor (Simplified and Synchronous) ---

    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => config,
      (err) => Promise.reject(err)
    );
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        return Promise.reject(err);
      }
    );
    // --- Cleanup Function ---
    // This removes the interceptors when the component unmounts or the user changes
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [axiosSecure]);
  return axiosSecure;
};

export default useAxiosSecure;
