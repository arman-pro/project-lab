import "./App.css";
import Content from "./Component/page/Content";
import Login from "./Component/Login/Login";
import Home from "./Component/page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequiredAuth from "./Component/AuthProvider/RequiredAuth";
import Doctors from "./Component/page/doctor/Doctors";
import EditDoctor from "./Component/page/doctor/EditDoctor";
import EditCo from "./Component/page/co/EditCo";
import CO from "./Component/page/co/Co";

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
        <Route
          path="doctors/:id/edit"
          exact
          element={
            <RequiredAuth>
              <EditDoctor/>
            </RequiredAuth>
          }
        />
        <Route
          path="/co"
          element={
            <RequiredAuth>
              <CO />
            </RequiredAuth>
          }
        />
        <Route
          path="co/:id/edit"
          exact
          element={
            <RequiredAuth>
              <EditCo/>
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
