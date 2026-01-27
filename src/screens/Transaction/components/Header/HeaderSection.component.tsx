import { CreditCard } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";

export function HeaderSection() {
  const { handleKeys } = useAppSearchParams();
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
      <DrawerTrigger asChild>
        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            handleKeys({
              add: [{ key: "create", value: "true" }],
              remove: ["id"]
            });
          }}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </DrawerTrigger>
    </div>
  );
}
