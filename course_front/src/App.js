import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Head from "./components/Head";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CabinetPage from "./pages/CabinetPage.jsx";
import ViewTemplatePage from "./pages/ViewTemplatePage.jsx";
import { AuthProvider } from "./auth/useAuth.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {
  return (
    <>
      <AuthProvider>
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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
