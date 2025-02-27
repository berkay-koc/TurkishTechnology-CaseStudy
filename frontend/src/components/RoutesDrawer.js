import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import circleIcon from "../icons/circle.svg";
import ellipsisIcon from "../icons/ellipsis-v.svg";

const RoutesDrawer = ({ isDrawerOpen, setIsDrawerOpen, selectedRoute }) => {
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      direction="right"
      className="drawer"
    >
      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 20px 0" }}>Route Details</h3>
        {selectedRoute && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {selectedRoute.map((route, index) => (
              <li key={index} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={circleIcon}
                    alt="circle"
                    style={{ marginRight: "8px" }}
                  />
                  {route.fromLocation}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={ellipsisIcon}
                    alt="ellipsis"
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                  />
                  {route.transportationType}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={circleIcon}
                    alt="circle"
                    style={{ marginRight: "8px" }}
                  />
                  {route.toLocation}
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => setIsDrawerOpen(false)}
        >
          Close
        </button>
      </div>
    </Drawer>
  );
};

export default RoutesDrawer;
