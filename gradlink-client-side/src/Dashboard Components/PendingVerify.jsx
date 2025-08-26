import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PendingVerify = () => {
  const axios = useAxiosSecure();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending students and alumni
  useEffect(() => {
    setLoading(true);
    Promise.all([axios.get("/studentlist"), axios.get("/alumnilist")])
      .then(([studentsRes, alumniRes]) => {
        const studentsPending = studentsRes.data.filter(
          (s) => s.status === "pending"
        );
        const alumniPending = alumniRes.data.filter(
          (a) => a.status === "pending"
        );
        setPendingUsers([...studentsPending, ...alumniPending]);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch pending users");
      })
      .finally(() => setLoading(false));
  }, [axios]);

  const handleVerify = async (user) => {
    try {
      const route =
        user.userType === "student"
          ? `/studentlist/${user.userId}`
          : `/alumnilist/${user.userId}`;

      await axios.put(route, { status: "verified", verifiedAt: new Date() });

      // Update locally
      setPendingUsers((prev) => prev.filter((u) => u.userId !== user.userId));
    } catch (err) {
      console.error(err);
      alert("Failed to verify user");
    }
  };

  const handleReject = async (user) => {
    try {
      const route =
        user.userType === "student"
          ? `/studentlist/${user.userId}`
          : `/alumnilist/${user.userId}`;

      await axios.put(route, { status: "rejected" });

      setPendingUsers((prev) => prev.filter((u) => u.userId !== user.userId));
    } catch (err) {
      console.error(err);
      alert("Failed to reject user");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl text-white mb-4">
        Pending Verification Requests
      </h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User Type</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Student/Alumni ID</th>
            <th>Batch / Graduation Year</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.length > 0 ? (
            pendingUsers.map((user, index) => (
              <tr key={user.userId}>
                <th>{index + 1}</th>
                <td>{user.userType}</td>
                <td>{user.fullName}</td>
                <td>{user.officialEmail}</td>
                <td>{user.department}</td>
                <td>{user.studentId}</td>
                <td>
                  {user.userType === "student"
                    ? user.batchYear
                    : user.graduationYear}
                </td>
                <td>{user.company || "-"}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      ⋮
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
                    >
                      <li>
                        <button
                          onClick={() => handleVerify(user)}
                          className="text-green-600"
                        >
                          Verify
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleReject(user)}
                          className="text-red-600"
                        >
                          Reject
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-white">
                No pending verification requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingVerify;
