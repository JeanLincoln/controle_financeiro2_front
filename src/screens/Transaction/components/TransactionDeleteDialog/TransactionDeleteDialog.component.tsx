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
import { useDeleteTransaction } from "@/store/requests/transaction/useDeleteTransaction.request";

type TransactionDeleteDialogProps = {
  transactionId: number | null;
  onClose: () => void;
};

export function TransactionDeleteDialog({
  transactionId,
  onClose
}: TransactionDeleteDialogProps) {
  const { handleDeleteTransaction, isLoading } = useDeleteTransaction();

  return (
    <>
      <AlertDialogContent>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Isso vai remover essa transação definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="default"
              className="flex w-fit items-center gap-2 text-white"
              disabled={isLoading}
              onClick={onClose}
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
                handleDeleteTransaction(transactionId ?? undefined);
                onClose();
              }}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="orbit" />
              ) : (
                <>
                  <Trash className="h-4 w-4" />
                  Deletar transação
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
