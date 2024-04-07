import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/auth/authContext";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary name="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
