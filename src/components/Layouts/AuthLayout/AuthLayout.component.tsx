import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  );
}
export { AuthLayout };
