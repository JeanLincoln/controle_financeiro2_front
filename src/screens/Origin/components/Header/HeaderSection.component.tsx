import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction
} from "@/components/Card/Card.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import type { HandleKeyProps } from "@/hooks/useAppSearchParams";
import { Building2 } from "lucide-react";

interface HeaderSectionProps {
  handleRemoveSearchParam: ({ key }: Pick<HandleKeyProps, "key">) => void;
}

export function HeaderSection({ handleRemoveSearchParam }: HeaderSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Origens</CardTitle>
        <CardAction>
          <DrawerTrigger asChild>
            <Button
              className="flex items-center w-24 gap-2"
              variant="outline"
              onClick={() => handleRemoveSearchParam({ key: "id" })}
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
