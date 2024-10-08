import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { AppOld } from "./AppOld.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <AppOld /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
