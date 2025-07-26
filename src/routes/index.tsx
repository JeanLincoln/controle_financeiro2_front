import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "./routes";
import PageNotFound from "@/screens/PageNotFound/PageNotFound.screen";
import { DefaultLayout } from "@/components/Layouts/DefaultLayout/DefaultLayout.component";
import ProtectedRoute from "./ProtectedRoute";
import { AuthLayout } from "@/components/Layouts/AuthLayout/AuthLayout.component";
import { Login } from "@/screens/Login/Login.screen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: APP_ROUTES,
    errorElement: <PageNotFound />
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
        errorElement: <PageNotFound />
      }
      // {
      //   path: "/auth/reset-password",
      //   element: <ResetPassword />,
      //   errorElement: <PageNotFound />
      // }
    ]
  }
]);
