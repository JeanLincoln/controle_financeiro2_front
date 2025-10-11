import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { TransactionForm } from "@/components/Form/Transaction/Transaction.form";
import { useSearchParams } from "react-router";

export const TransactionFormDrawer = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <DrawerContent className="w-full max-w-2xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>{id ? "Editar Transação" : "Nova Transação"}</DrawerTitle>
        <DrawerDescription>
          {id
            ? "Edite os dados da origem"
            : "Preencha os dados para criar uma nova origem"}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 flex items-center justify-center">
        <TransactionForm />
      </div>
    </DrawerContent>
  );
};
