import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { CategoryForm } from "@/components/Form/Category/Category.form";
import { useSearchParams } from "react-router";

export const CategoryDrawer = () => {
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
        <CategoryForm />
      </div>
    </DrawerContent>
  );
};
