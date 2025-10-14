import { Outlet } from "react-router";

import { Aside } from "./Aside/Aside.component";

function DefaultLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Aside />
      <main className="min-h-screen w-full pl-24 transition-all duration-300 ease-in-out peer-hover:pl-54">
        <Outlet />
      </main>
    </div>
  );
}
export { DefaultLayout };
