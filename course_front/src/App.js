import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Head from "./components/Head";
import { Routes, Route } from "react-router-dom";
import CabinetPage from "./pages/CabinetPage.jsx";
import EditTemplateForm from "./components/EditTemplateForm.jsx";

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cabinet" element={<CabinetPage />} />
        <Route path="/create" element={<EditTemplateForm />} />
      </Routes>
    </>
  );
}

export default App;
