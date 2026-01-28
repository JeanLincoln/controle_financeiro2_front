import { LogOut, User } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { useLogout } from "@/hooks/useLogout.hook";
import { useAppSelector } from "@/store";

export function Header() {
  const logout = useLogout();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {`Bem vindo ao seu controle financeiro ${
            user ? `, ${user.firstName} !` : "!"
          }`}
        </CardTitle>
        <CardDescription>
          Aqui você pode visualizar seu saldo atual e gerenciar suas finanças.
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
    </Card>
  );
}
