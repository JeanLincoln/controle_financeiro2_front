import { Outlet } from "react-router";
import { Aside } from "./Aside/Aside.component";
import { asideExpansionMainPadding } from "./constants/asideExpansionSpacing.constant";

const mainClassNames = `w-full min-h-full transition-all duration-300 ease-in-out ${asideExpansionMainPadding.collapsed} peer-hover:${asideExpansionMainPadding.expanded}`;

function DefaultLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Aside />
      <main className={mainClassNames}>
        <Outlet />
      </main>
    </div>
  );
}
export { DefaultLayout };
