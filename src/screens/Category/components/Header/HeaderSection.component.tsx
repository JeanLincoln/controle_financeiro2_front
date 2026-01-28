import { FolderOpen } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import { CATEGORY_ID_FORM_KEY } from "@/components/Form/Category/Category.form";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";

export function HeaderSection() {
  const { handleRemoveKey } = useAppSearchParams();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardAction>
          <DrawerTrigger asChild>
            <Button
              className="flex w-24 items-center gap-2"
              variant="outline"
              onClick={() => handleRemoveKey({ key: CATEGORY_ID_FORM_KEY })}
            >
              Criar
              <FolderOpen />
            </Button>
          </DrawerTrigger>
        </CardAction>
        <CardDescription>
          Gerencie suas categorias de transações financeiras.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
