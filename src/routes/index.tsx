import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "./routes";
import PageNotFound from "@/screens/PageNotFound/PageNotFound.screen";
import { DefaultLayout } from "@/components/Layouts/DefaultLayout/DefaultLayout.component";
import ProtectedRoute from "./ProtectedRoute";
import { AuthLayout } from "@/components/Layouts/AuthLayout/AuthLayout.component";
import { Login } from "@/screens/Login/Login.screen";
import Register from "@/screens/Register/Register.screen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
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
