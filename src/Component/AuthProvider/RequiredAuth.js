import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import axios from "axios";
import { ToastContainer } from "react-toastify";

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
  } else {
    // retrive authentication  crediantials
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    axios.defaults.headers.post["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${auth.token}`;
      return config;
    });
  }
  return (
    <div className="App">
    <ToastContainer />
      <main>
        <Sidebar />
        <div
          className="content"
          id="content"
          style={{ minHeight: "100vh", marginLeft: "260px" }}
        >
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
}

export default RequiredAuth;
