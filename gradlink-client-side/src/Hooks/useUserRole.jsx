
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from './useAxiosSecure';



// const fetchUserRole = async (email) => {
//   const res = await axiosSecure.get(`/users/role/${email}`);
//   return res.data?.role || null;
// };

const useUserRole = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure()

  const {
    data: role,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email, // only run if email exists

  });

  if (isError) {
    console.error('Failed to fetch user role:', error);
  }

  return { role, isLoading };
};

export default useUserRole;
