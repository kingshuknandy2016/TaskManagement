import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-2xl font-bold">TaskNest</div>
      <nav className="flex flex-col gap-4 p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-bold text-yellow-400" : ""
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "font-bold text-yellow-400" : ""
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "font-bold text-yellow-400" : ""
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
