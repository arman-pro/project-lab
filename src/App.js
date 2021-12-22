import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar";
import Content from "./Component/page/Content";
import Login from "./Component/Login/Login";
import Logout from "./Component/Login/Logout";
import Home from "./Component/page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequiredAuth from "./Component/AuthProvider/RequiredAuth";

import axios from "axios";

// retrive authentication  crediantials
let auth =
  localStorage.getItem("auth") !== null
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
if (auth !== null && auth.login)
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Sidebar />
          <div className="content" style={{ minHeight: "100vh" }}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <RequiredAuth>
                    <Home />
                  </RequiredAuth>
                }
              />
              <Route
                path="/new"
                element={
                  <RequiredAuth>
                    <Content />
                  </RequiredAuth>
                }
              />
              <Route
                path="/logout"
                element={
                  <RequiredAuth>
                    <Logout />
                  </RequiredAuth>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
