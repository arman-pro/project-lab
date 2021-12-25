import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'

export default function Sidebar() {

  useEffect(() => {
    const menu = document.querySelectorAll('.c-pointer');
    menu.forEach(el => el.addEventListener('click', (event) => {
      const subList = el.childNodes[3];
          if(subList.style.height==='0px') {
            const height = subList.childNodes[0].offsetHeight * subList.childNodes.length;
            subList.style.height = height+'px';
          } else {
            subList.style.height = '0';
          }
    }))
  })

    return (
        <div className="sidebar bg-d">
          <div className="bg-d">
            <ul className="list-group list-group-flush side-menu">
              <li className="list-group-item text-center">
                <i className="fa fa-dashboard"></i> Dashboard
              </li>
              <Link to="/" className="list-group-item">
                <i className="fa fa-home"></i> Home{" "}
              </Link>

              <li className="list-group-item c-pointer">
                <i className="fa fa-heart"></i> Patient
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                    <i className="fa fa-angle-right"></i> New Patient
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Patient List
                  </Link>
                </ul>
              </li>

              <li className="list-group-item c-pointer">
                <i className="fa fa-stethoscope"></i> Pathology
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Pathology
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Urine
                  </Link>
                </ul>
              </li>

              <li className="list-group-item c-pointer">
                <i className="fa fa-dollar"></i> Accounting
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> New Account
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Account List
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> CO Payment
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Payment List
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Doctor Payment
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Payment List
                  </Link>
                </ul>
              </li>
              <li className="list-group-item c-pointer">
                <i className="fa fa-users"></i> HRM
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> New Department
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Department List
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> New Employee
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Employee List
                  </Link>
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Payroll
                  </Link>
                </ul>
            </li>
             <li className="list-group-item c-pointer">
                <i className="fa fa-file-pdf-o"></i>   Report
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Today's Report
                  </Link>
                </ul>
              </li>
             <li className="list-group-item c-pointer">
                <i className="fa fa-cogs"></i> Settings
                <span className="f-right">
                  <i className="fa fa-angle-right"></i>
                </span>
                <ul
                  className="list-group list-group-flush drop-menu"
                  style={{ height: "0" }}
                >
                  <Link to="new" className="list-group-item">
                  <i className="fa fa-angle-right"></i> Title & Location
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    )
}
