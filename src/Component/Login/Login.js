import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [type, setType] = useState("password");
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState({
    show: false,
    text: null,
  });
  document.title = "User Login";

  useEffect(() => {
    let auth =
      localStorage.getItem("auth") !== null
        ? JSON.parse(localStorage.getItem("auth"))
        : null;
    if (auth !== null && auth.login) {
      navigate("/");
    }
  });

  const handleForm = async (e) => {
    e.preventDefault();
    // set loadgin true | show loading sppiner
    setLoading(true);
    // hide messagebox
    setMessage({ show: false, text: null });

    axios.defaults.withCredentials = true;
    await axios
      .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      .then((response) => {
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
            // again preloader sppiner set false
            setLoading(false);
            if (res.status === 201) {
              let loginData = res.data;
              if (loginData.success) {
                // here will change the user name
                localStorage.setItem(
                  "auth",
                  JSON.stringify({
                    login: true,
                    userName: "N/A",
                    token: loginData.access_token,
                  })
                ); // set user login true
                navigate("/", { state: { message: "Admin Access" } });
              }
            }
          })
          .catch((e) => {
            setLoading(false);
            setMessage({
              show: true,
              text:
                e.response.status === 401
                  ? "Invalid Username or Password"
                  : e.response.statusText,
            });
          });
      })
      .catch((e) => {
        setLoading(false);
        setMessage({
          show: true,
          text: e.message,
        });
      });
  };

  const showHidePsw = () => {
    setType(type === "password" ? "text" : "password");
  };
  let { show, text } = message;
  return (
    <div className="p-3">
      <form
        style={{ maxWidth: "500px", margin: "auto", marginTop: "20px" }}
        className="row g-3 p-3 bg-llight text-dark border rounded"
        method="post"
        onSubmit={handleForm}
      >
        {" "}
        <h4 className="text-center">User Login</h4>
        {show && (
          <div className="alert alert-danger " role="alert">
            {text}
          </div>
        )}
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
            autoFocus
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
              type={type}
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
              {type === "password" ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i className="fa fa-eye-slash"></i>
              )}
            </span>
          </div>
          {/* <div className="invalid-feedback">Wrong Password</div> */}
        </div>
        <div className="col-sm-12">
          {!loading ? (
            <button type="submit" className="btn btn-sm btn-success">
              Login
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm spinner-border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
