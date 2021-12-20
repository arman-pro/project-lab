import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar";
import Content from "./Component/page/Content";
import Login from "./Component/Login/Login";
import Home from "./Component/page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Sidebar />
          <div className="content" style={{ minHeight: "100vh" }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<Content />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
