import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Toaster richColors />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
