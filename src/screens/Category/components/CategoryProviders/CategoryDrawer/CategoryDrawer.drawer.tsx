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
import { useSearchParams } from "react-router";

export const CategoryDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get(CATEGORY_ID_FORM_KEY);

  return (
    <DrawerContent className="w-full  mx-auto">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Categoria" : "Nova Categoria"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da categoria"
            : "Preencha os dados para criar uma nova categoria"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 flex items-center justify-center">
        <CategoryForm />
      </div>
    </DrawerContent>
  );
};
