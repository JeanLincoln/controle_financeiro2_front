import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import { router } from "./routes";
import { store } from "./store";

setDefaultOptions({ locale: ptBR });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
