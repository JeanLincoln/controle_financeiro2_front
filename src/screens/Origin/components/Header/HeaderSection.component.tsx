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
import { Building2 } from "lucide-react";

export function HeaderSection() {
  const { handleRemoveKey } = useAppSearchParams();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Origens</CardTitle>
        <CardAction>
          <DrawerTrigger asChild>
            <Button
              className="flex items-center w-24 gap-2"
              variant="outline"
              onClick={() => handleRemoveKey({ key: "id" })}
            >
              Criar
              <Building2 />
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
