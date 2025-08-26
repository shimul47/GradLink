import { useState, useEffect, use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useUserType = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    axiosSecure
      .get(`/users/userType/${user.email}`)
      .then((res) => {
        setUserType(res.data?.userType || null);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch user type:", err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.email, axiosSecure]);

  return { userType };
};

export default useUserType;
