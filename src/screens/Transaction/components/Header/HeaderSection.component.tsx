import { CreditCard } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";

export function HeaderSection() {
  const { handleKeys } = useAppSearchParams();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
        <CardAction>
          <DrawerTrigger asChild>
            <Button
              className="flex w-24 items-center gap-2"
              variant="outline"
              onClick={() => {
                handleKeys({
                  add: [{ key: "create", value: "true" }],
                  remove: ["id"]
                });
              }}
            >
              Criar
              <CreditCard />
            </Button>
          </DrawerTrigger>
        </CardAction>
        <CardDescription>
          Gerencie suas origens de transações financeiras.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
