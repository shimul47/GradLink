import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const useUserStatus = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    // Check student list first
    axiosSecure
      .get("/studentlist")
      .then((res) => {
        const student = res.data.find((s) => s.userId === user.uid);
        if (student) {
          setUserStatus(student.status);
          setLoading(false);
          return null; // stop here, no need to check alumni/admin
        }
        // Check alumni list
        return axiosSecure.get("/alumnilist");
      })
      .then((res) => {
        if (!res) return; // already found in students
        const alumni = res.data.find((a) => a.userId === user.uid);
        if (alumni) {
          setUserStatus(alumni.status);
          setLoading(false);
          return null; // stop here, no need to check admin
        }
        // Check admin list
        return axiosSecure.get("/adminlist");
      })
      .then((res) => {
        if (!res) return; // already found in students or alumni
        const admin = res.data.find((a) => a.userID === user.uid);
        if (admin) setUserStatus(admin.status || "verified");
        else setUserStatus("not_found");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user status:", err);
        setError(err);
        setLoading(false);
      });
  }, [user?.uid, axiosSecure]);

  return { userStatus, loading, error };
};

export default useUserStatus;
