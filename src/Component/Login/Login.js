import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  document.title = "Login Page";
  const appLogin = () => {
    auth.appLogin(true, "Hasan", () => {
      navigate(-1);
    });
  };

  return (
    <div className="p-3">
      <h2>Login Page {auth.userName}</h2>
      <button
        type="submit"
        onClick={appLogin}
        className="btn btn-sm btn-outline-primary"
      >
        Login
      </button>
    </div>
  );
}
