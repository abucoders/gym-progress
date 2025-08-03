import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";
import "./style/index.css";
import { ThemeProvider } from "./components/providers/theme-provider";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@/components/providers/auth-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="gym-theme">
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
