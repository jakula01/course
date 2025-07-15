import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Head from "./components/Head";
import { Routes, Route } from "react-router-dom";
import CabinetPage from "./pages/CabinetPage.jsx";
import ViewTemplatePage from "./pages/ViewTemplatePage.jsx";
import { AuthProvider } from "./auth/useAuth.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import AdminPage from "./pages/AdminPage.jsx";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute.jsx";
import { TemplateTitleProvider } from "./components/TemplateTitleProvider.jsx";
function App() {
  return (
    <TemplateTitleProvider>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <Head />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/template/:id"
            element={
              <ProtectedRoute>
                <ViewTemplatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cabinet/*"
            element={
              <ProtectedRoute>
                <CabinetPage />
              </ProtectedRoute>
            }
          />

          <Route />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </TemplateTitleProvider>
  );
}

export default App;
