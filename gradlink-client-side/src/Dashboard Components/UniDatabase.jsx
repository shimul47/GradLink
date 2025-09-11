import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

const UniDatabase = () => {
  const axios = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/university-database")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [axios]);

  if (loading)
    return <Loader />;

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">{error}</p>
    );

  return (
    <div className="overflow-x-auto  p-6">
      <table className="table w-full">
        <thead>
          <tr className="border">
            <th>#</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr className="border-b border-white" key={user.studentID}>
                <th>{index + 1}</th>
                <td>{user.studentID}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.userType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-white">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UniDatabase;
