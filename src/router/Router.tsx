import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";

import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/layout/Layout";
import Loading from "../components/layout/Loading";

const ProtectedDashboard = ProtectedRoute(() => (
  <Layout>
    <Dashboard />
  </Layout>
));

const ProtectedTasks = ProtectedRoute(() => (
  <Layout>
    <Tasks />
  </Layout>
));

// const SettingsLazy = lazy(() => import("../pages/Settings"));
// SettingsLazy.tsx or similar
const SettingsLazy = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => resolve(import("../pages/Settings")), 3000); // 3 sec delay
    })
);

const ProtectedSettings = ProtectedRoute(() => (
  <Suspense
    fallback={<Loading size="lg" message="Loading settings..." progress={50} />}
  >
    <Layout>
      <SettingsLazy />
    </Layout>
  </Suspense>
));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/tasks" element={<ProtectedTasks />} />
      <Route path="/settings" element={<ProtectedSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
