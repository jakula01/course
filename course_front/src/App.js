import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Head from "./components/Head";
import { Routes, Route } from "react-router-dom";
import CabinetPage from "./pages/CabinetPage.jsx";
import ViewTemplatePage from "./pages/ViewTemplatePage.jsx";

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cabinet" element={<CabinetPage />} />
        <Route path="/template/:id" element={<ViewTemplatePage />} />
      </Routes>
    </>
  );
}

export default App;
