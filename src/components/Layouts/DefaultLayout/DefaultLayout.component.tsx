import { Outlet } from "react-router";
import { Aside } from "./Aside/Aside.component";

function DefaultLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Aside />
      <main className="transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
export { DefaultLayout };
