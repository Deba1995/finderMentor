import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
