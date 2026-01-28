import { Link } from "react-router";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { useLogout } from "@/hooks/useLogout.hook";
import { cn } from "@/utils/cn.utils";

import { asideNavigationItems } from "./constants/asideNavigationItems.constant";

export function Aside() {
  const logout = useLogout();

  return (
    <aside className="peer group bg-card border-border fixed z-10 flex min-h-screen w-24 flex-col overflow-hidden border-r transition-all duration-300 ease-in-out hover:w-54">
      <div className="border-border flex items-center justify-center border-b p-6 transition-all duration-300 group-hover:justify-start">
        <Link
          to="/profile"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <User className="text-primary h-5 w-5" />
          </div>
          <span className="text-foreground hidden font-medium whitespace-nowrap transition-opacity duration-300 group-hover:block">
            User Profile
          </span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col justify-center space-y-2 px-4">
        {asideNavigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center justify-center gap-3 rounded-lg px-4 py-3 transition-colors group-hover:justify-start",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden font-medium whitespace-nowrap transition-opacity duration-300 group-hover:block">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t p-4">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-center gap-3 transition-all duration-300 group-hover:justify-start"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="hidden whitespace-nowrap transition-opacity duration-300 group-hover:block">
            Logout
          </span>
        </Button>
      </div>
    </aside>
  );
}
