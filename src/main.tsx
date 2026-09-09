import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner.component";

import "./index.css";

import { router } from "./routes";
import { persistor, store } from "./store";

setDefaultOptions({ locale: ptBR });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <LoadingSpinner variant="orbit" size="lg" />
          </div>
        }
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
