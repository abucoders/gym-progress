import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";
import "./style/index.css";
import { ThemeProvider } from "./components/providers/theme-provider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="gym-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
