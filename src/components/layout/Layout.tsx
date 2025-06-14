import React from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "../ThemeToggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 dark:bg-gray-900 dark:text-white min-h-screen">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
