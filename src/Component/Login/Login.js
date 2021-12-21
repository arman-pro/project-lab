import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  document.title = "User Login";

  // const appLogin = () => {
  //   auth.appLogin(true, "Hasan", () => {
  //     navigate(-1);
  //   });
  // };

  const handleForm = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then((response) => {
      axios.defaults.withCredentials = true;
      axios
        .post(
          "http://127.0.0.1:8000/api/login",
          {
            userName: userName,
            password: password,
          },
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
    });
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
      <form
        style={{ maxWidth: "500px", marginTop: "25px", margin: "auto" }}
        className="row g-3 p-3 bg-llight text-dark border rounded"
        method="post"
        onSubmit={handleForm}
      >
        {" "}
        <h4 className="text-center">User Login</h4>
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
