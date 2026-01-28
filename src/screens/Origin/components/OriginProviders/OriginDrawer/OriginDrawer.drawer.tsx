import { useSearchParams } from "react-router";

import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { OriginForm } from "@/components/Form/Origin/Origin.form";

export const OriginDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <DrawerContent className="mx-auto w-full max-w-2xl">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Origem" : "Nova Origem"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da origem"
            : "Preencha os dados para criar uma nova origem"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex items-center justify-center p-4">
        <OriginForm />
      </div>
    </DrawerContent>
  );
};
