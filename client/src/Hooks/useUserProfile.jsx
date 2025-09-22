
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUserProfile = (email) => {
  const axiosSecure=useAxiosSecure()
  return useQuery({
    queryKey: ["userProfile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
  });
};

export default useUserProfile;
