import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Locations from "./pages/Locations";
import Transportations from "./pages/Transportations";
import RoutesPage from "./pages/Routes";
import "./styles/main.css";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="p-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/locations" element={<Locations />} />
            <Route path="/transportations" element={<Transportations />} />
            <Route path="/routes" element={<RoutesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
