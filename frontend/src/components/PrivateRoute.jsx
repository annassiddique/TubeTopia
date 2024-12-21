import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/signup" state={{ from: location }} replace />;
    }


    return children;
};

export default PrivateRoute;
