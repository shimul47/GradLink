import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';



const useUserStatus = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: statusData, isLoading, isError, refetch } = useQuery({
    enabled: !!user?.email, // Only run when email is available
    queryKey: ['user-status', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-status/${user.email}`);
      return res.data?.status;
    },
    staleTime: 5 * 60 * 1000 // Optional: cache for 5 minutes
  });

  return { userStatus: statusData, isLoading, isError, refetch };
};

export default useUserStatus;
