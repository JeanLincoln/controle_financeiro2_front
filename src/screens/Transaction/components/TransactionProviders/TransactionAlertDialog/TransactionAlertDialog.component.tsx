import { useSearchParams } from "react-router";
import { Trash, X } from "lucide-react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/AlertDialog/AlertDialog.component";
import { Button } from "@/components/Button/Button.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useDeleteTransaction } from "@/store/requests/transaction/useDeleteTransaction.request";

export function TransactionAlertDialog() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { handleRemoveKey } = useAppSearchParams();
  const { handleDeleteTransaction, isLoading } = useDeleteTransaction();

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso vai remover essa origem de todas as transações que a têm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="default"
              className="flex w-fit items-center gap-2 text-white"
              disabled={isLoading}
              onClick={() => handleRemoveKey({ key: "id" })}
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              className="flex w-fit items-center gap-2 text-white"
              disabled={isLoading}
              onClick={() => {
                handleDeleteTransaction(Number(id));
                handleRemoveKey({ key: "id" });
              }}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="orbit" />
              ) : (
                <>
                  <Trash className="h-4 w-4" />
                  Deletar origem
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
