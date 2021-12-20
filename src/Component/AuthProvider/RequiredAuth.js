import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

/**
 * Check User Authentication
 * @param {React Node} children
 * @returns {React Node}
 */
function RequiredAuth({ children }) {
  let auth = useContext(AuthContext);
  let location = useLocation();
  // if login false redirect to login page
  if (!auth.login) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequiredAuth;
