import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import PermissionProvider from "./contex/PermissionProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Toaster expand={true} richColors />
        <PermissionProvider>
          <RouterProvider router={router} />
        </PermissionProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
