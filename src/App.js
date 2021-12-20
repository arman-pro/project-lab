import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar";
import Content from "./Component/page/Content";
import Login from "./Component/Login/Login";
import Home from "./Component/page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./Component/AuthProvider/AuthProvider";
import RequiredAuth from "./Component/AuthProvider/RequiredAuth";

function App() {
  return (
    <AuthProvider>
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
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
