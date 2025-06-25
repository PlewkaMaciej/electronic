// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/index.ts";

import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
