import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";
import "./style/index.css";
import { ThemeProvider } from "./components/providers/theme-provider";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@/components/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="gym-theme">
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
