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
import Category from "./Component/page/category/Category";
import CategoryEdit from "./Component/page/category/CategoryEdit";
import Test from "./Component/page/test/Test";
import AddPatient from "./Component/page/patient/AddPatient";

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
        <Route
          path="/categories"
          exact
          element={
            <RequiredAuth>
              <Category/>
            </RequiredAuth>
          }
        />
        <Route
          path="/categories/:id/edit"
          exact
          element={
            <RequiredAuth>
              <CategoryEdit/>
            </RequiredAuth>
          }
        />
        <Route
          path="/testes"
          exact
          element={
            <RequiredAuth>
              <Test/>
            </RequiredAuth>
          }
        />
        <Route
          path="/add-patient"
          exact
          element={
            <RequiredAuth>
              <AddPatient/>
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
