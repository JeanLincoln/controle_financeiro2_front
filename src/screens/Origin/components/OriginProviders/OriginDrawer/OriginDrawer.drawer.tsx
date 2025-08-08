import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { OriginForm } from "@/components/Form/Origin/Origin.form";
import { useSearchParams } from "react-router";

export const OriginDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <DrawerContent className="w-full max-w-2xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Origem" : "Nova Origem"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da origem"
            : "Preencha os dados para criar uma nova origem"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 flex items-center justify-center">
        <OriginForm />
      </div>
    </DrawerContent>
  );
};
