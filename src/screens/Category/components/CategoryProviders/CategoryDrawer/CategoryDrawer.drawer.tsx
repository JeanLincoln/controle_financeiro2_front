import { useSearchParams } from "react-router";

import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import {
  CATEGORY_ID_FORM_KEY,
  CategoryForm
} from "@/components/Form/Category/Category.form";

export const CategoryDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get(CATEGORY_ID_FORM_KEY);

  return (
    <DrawerContent className="mx-auto w-full">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Categoria" : "Nova Categoria"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da categoria"
            : "Preencha os dados para criar uma nova categoria"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex items-center justify-center p-4">
        <CategoryForm />
      </div>
    </DrawerContent>
  );
};
