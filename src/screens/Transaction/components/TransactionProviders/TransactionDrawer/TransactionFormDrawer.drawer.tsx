import { useSearchParams } from "react-router";

import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { TransactionForm } from "@/components/Form/Transaction/Transaction.form";

export const TransactionFormDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <DrawerContent className="mx-auto w-full max-w-2xl">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Transação" : "Nova Transação"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da origem"
            : "Preencha os dados para criar uma nova origem"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex items-center justify-center p-4">
        <TransactionForm />
      </div>
    </DrawerContent>
  );
};
