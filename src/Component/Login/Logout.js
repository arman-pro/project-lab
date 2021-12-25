import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

function Logout() {
  let location = useLocation();
  let auth =
    localStorage.getItem("auth") !== null
      ? JSON.parse(localStorage.getItem("auth"))
      : null;

  if (auth !== null && !auth.login) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    axios.get("/logout").then((res) => {
      if (res.status === 200 && res.data.success === true) {
      }
    });
    //   .catch((e) => console.log(e.message));
    localStorage.setItem("auth", null);
    return <Navigate to="/" state={{ from: location }} />;
  }
}

export default Logout;
