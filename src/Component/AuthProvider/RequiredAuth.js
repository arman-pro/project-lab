import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Check User Authentication
 * @param {React Node} children
 * @returns {React Node}
 */
function RequiredAuth({ children }) {
  let auth =
    localStorage.getItem("auth") !== null
      ? JSON.parse(localStorage.getItem("auth"))
      : null;

  let location = useLocation();

  // if login false redirect to login page
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequiredAuth;
