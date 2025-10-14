import { createBrowserRouter } from "react-router";

import AuthLayout from "@/components/Layouts/AuthLayout/AuthLayout.component";
import { DefaultLayout } from "@/components/Layouts/DefaultLayout/DefaultLayout.component";
import { Login } from "@/screens/Login/Login.screen";
import PageNotFound from "@/screens/PageNotFound/PageNotFound.screen";
import Register from "@/screens/Register/Register.screen";

import { APP_ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <PageNotFound />,
    children: APP_ROUTES
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/register",
        element: <Register />
      }
    ]
  }
]);
