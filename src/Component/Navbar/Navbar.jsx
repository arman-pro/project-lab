import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import "./Navbar.css"
import Preloader from '../Loader/Preloader';

export default function Navbar() {
  let navigate = useNavigate();
  const [logoutPreload, setLogoutPreload] = useState(false);
  const logout = async () => {
    setLogoutPreload(true);
    let auth =localStorage.getItem("auth") !== null
      ? JSON.parse(localStorage.getItem("auth"))
        : null;
    if (auth !== null) {
      axios
        .get("/logout")
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            localStorage.setItem("auth", null);
            setLogoutPreload(false);
            navigate("/login", { replace: true });
          }
        }).catch(e => {
          setLogoutPreload(false);
          console.log(e.message);
        })
    }
    }

  
  return (
    <React.Fragment>
      {
        logoutPreload && <Preloader/>
      }
        <header className="bg-primary text-light">
        <div className="left-sidebar">
          <button className="btn btn-sm btn-light">
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div>
          <h4>Lab Managment System</h4>
        </div>
        <div className="right-sidebar">
          <div className="btn-group">
            <button
              className="btn btn-outline-light btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-user-circle"></i> Arman
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="settings" className="dropdown-item">
                  Settings
                </Link>
              </li>
              
              <li onClick={logout} className="dropdown-item" role="button">
               Logout
              </li>
            </ul>
          </div>{" "}
          <Link className="btn btn-sm btn-outline-light" to="login" >Login</Link>
        </div>
      </header>
      </React.Fragment>
    )
}
