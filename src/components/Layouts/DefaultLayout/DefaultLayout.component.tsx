import { Outlet, useLocation } from "react-router";

import { Aside } from "./Aside/Aside.component";

function DefaultLayout() {
  const location = useLocation();

  return (
    <div className="bg-background min-h-screen">
      <Aside />
      <main className="min-h-screen w-full pl-24 transition-all duration-300 ease-in-out peer-hover:pl-54">
        <div
          key={location.pathname}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
export { DefaultLayout };
