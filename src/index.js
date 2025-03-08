import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./routes/App";
import AuthProvider from "./assets/components/context/AuthProvider"; // Pastikan path benar
import "../src/assets/css/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* ✅ Bungkus App dengan AuthProvider */}
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
