import React, { createContext, useContext, useState } from "react";

const TemplateTitleContext = createContext(null);

export const useTemplateTitle = () => useContext(TemplateTitleContext);

export function TemplateTitleProvider({ children }) {
  const [templateTitle, setTemplateTitle] = useState(null);

  return (
    <TemplateTitleContext.Provider value={{ templateTitle, setTemplateTitle }}>
      {children}
    </TemplateTitleContext.Provider>
  );
}
