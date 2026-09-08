import { Link } from "react-router";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/Button/Button.component";

export function HeaderSection() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          Transações
        </h1>
        <p className="text-muted-foreground text-xs">
          Gerencie e acompanhe suas transações financeiras
        </p>
      </div>
      <Button asChild className="w-full sm:w-auto">
        <Link to="/transaction/new">
          <CreditCard className="mr-2 h-4 w-4" />
          Nova Transação
        </Link>
      </Button>
    </div>
  );
}
