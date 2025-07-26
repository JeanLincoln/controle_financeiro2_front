import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  );
}
export { DefaultLayout };
