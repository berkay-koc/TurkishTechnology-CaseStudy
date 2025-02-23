import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={sidebarStyle}>
      <div style={menuContainerStyle}>
        <MenuItem to="/locations" label="Locations" />
        <MenuItem to="/transportations" label="Transportations" />
        <MenuItem to="/routes" label="Routes" />
      </div>
    </aside>
  );
};

const MenuItem = ({ to, label }) => {
  return (
    <Link to={to} style={linkStyle}>
      <div style={menuItemStyle}>{label}</div>
    </Link>
  );
};

const sidebarStyle = {
  backgroundColor: "#f8f9fa",
  padding: "1rem",
  width: "250px",
  minHeight: "calc(100vh - 4rem)",
  borderRight: "1px solid #ddd",
};

const menuContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const menuItemStyle = {
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  fontWeight: "bold",
  color: "#343a40",
};

const linkStyle = {
  textDecoration: "none",
};

export default Sidebar;
