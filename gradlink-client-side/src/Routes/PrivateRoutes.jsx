import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
