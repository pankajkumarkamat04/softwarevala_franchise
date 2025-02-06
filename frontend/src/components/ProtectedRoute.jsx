import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./user/Loader";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children, admin, reseller, franchise }) => {
  const { isAuthorized, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace={true} />;
  }

  if (admin && user?.role != "admin") {
    toast.error(`You don't have permession for this resource`)
    return <Navigate to="/login" replace={true} />;
  }
  if (reseller && user?.role != "reseller") {
    toast.error('You dont have permession for this resource')
    return <Navigate to="/reseller/plan" replace={true} />;
  }

  if (franchise && user?.role != "franchise") {
    toast.error('You dont have permession for this resource')
    return <Navigate to="/franchise/plan" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
