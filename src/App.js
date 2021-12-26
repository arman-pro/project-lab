import "./App.css";
import Content from "./Component/page/Content";
import Login from "./Component/Login/Login";
import Home from "./Component/page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequiredAuth from "./Component/AuthProvider/RequiredAuth";
import Doctors from "./Component/page/doctor/Doctors";

// // retrive authentication  crediantials
// let auth =
//   localStorage.getItem("auth") !== null
//     ? JSON.parse(localStorage.getItem("auth"))
//     : null;

// axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.headers.post["Accept"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;
// if (auth !== null && auth.login) {
//   axios.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${auth.token}`;
//     return config;
//   });
// }

function App() {
  return (
    <Router>
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
          path="/doctors"
          element={
            <RequiredAuth>
              <Doctors />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
