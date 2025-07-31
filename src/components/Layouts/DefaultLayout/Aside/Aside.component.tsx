import { Link } from "react-router";
import { Button } from "@/components/Button/Button.component";
import { cn } from "@/utils/cn.utils";
import { LogOut, User } from "lucide-react";
import { useLogout } from "@/hooks/useLogout.hook";
import { asideNavigationItems } from "./constants/asideNavigationItems.constant";

export function Aside() {
  const logout = useLogout();

  return (
    <aside className="fixed group flex min-h-screen w-24 hover:w-52 flex-col bg-card border-r border-border transition-all duration-300 ease-in-out overflow-hidden z-10">
      <div className="flex items-center justify-center group-hover:justify-start p-6 border-b border-border transition-all duration-300">
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium text-foreground hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
            User Profile
          </span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-4 space-y-2">
        {asideNavigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group-hover:justify-start justify-center",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium hidden group-hover:block  transition-opacity duration-300 whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-center group-hover:justify-start gap-3 transition-all duration-300"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
            Logout
          </span>
        </Button>
      </div>
    </aside>
  );
}
