import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  document.title = "Login Page";

  const appLogin = () => {
    auth.appLogin(true, "Hasan", () => {
      navigate(-1);
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(userName, password);
  };

  const showHidePsw = () => {
    let box = document.querySelector("#password");
    if (box.type === "password") {
      box.type = "text";
    } else {
      box.type = "password";
    }
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
      <form
        style={{ maxWidth: "500px", margin: "auto" }}
        className="row g-3 p-3 bg-llight text-dark border rounded"
        method="post"
        onSubmit={handleForm}
      >
        {" "}
        <div className="col-sm-12">
          <label htmlFor="userName" className="form-label">
            User Name *
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            required
          />
          {/* <div className="valid-feedback">Correct User</div> */}
        </div>
        <div className="col-sm-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Write Password"
              aria-describedby="passwordAppend"
              required
            />
            <span
              role="button"
              className="input-group-text "
              id="passwordAppend"
              onClick={showHidePsw}
            >
              <i className="fa fa-eye"></i>
            </span>
          </div>
          {/* <div className="invalid-feedback">Wrong Password</div> */}
        </div>
        <div className="col-sm-12">
          <button type="submit" className="btn btn-sm btn-success">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
