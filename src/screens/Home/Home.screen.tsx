import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter
} from "@/components/Card/Card";
import { Button } from "@/components/Button/Button.component";
import { useLogout } from "@/hooks/useLogout";
import { LogOut, User } from "lucide-react";
import { useAppSelector } from "@/store";
import { useBalanceQuery } from "@/store/services/dashboard/dashboard.service";

export default function Home() {
  const { data: balance } = useBalanceQuery();
  const user = useAppSelector((state) => state.auth.user);
  const logout = useLogout();

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Welcome to Your Financial Control, {user?.firstName || ""}!
          </CardTitle>
          <CardDescription>
            You are successfully logged in with cookie-based authentication!
          </CardDescription>
          <CardAction>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {JSON.stringify(balance, null, 2) || "Loading balance..."}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your authentication is handled via secure HTTP-only cookies.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
