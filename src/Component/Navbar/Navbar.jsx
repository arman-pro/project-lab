import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
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
              <li>
                <Link to="logout" className="dropdown-item">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
}
