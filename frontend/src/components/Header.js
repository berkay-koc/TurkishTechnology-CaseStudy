import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Path Planner</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#343a40",
  color: "white",
  textAlign: "center",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.8rem",
};

export default Header;
