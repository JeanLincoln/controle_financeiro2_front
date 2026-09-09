import { Trash, X } from "lucide-react";

import {
  AlertDialog,
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

type RelationDeleteDialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  relationName?: string;
  isLoading: boolean;
  onConfirm: () => void;
};

export function RelationDeleteDialog({
  open,
  onOpenChange,
  relationName,
  isLoading,
  onConfirm
}: RelationDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso vai remover {relationName ? `"${relationName}"` : "este item"}{" "}
            definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="default"
              className="flex w-fit items-center gap-2 text-white"
              disabled={isLoading}
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
              onClick={onConfirm}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="orbit" />
              ) : (
                <>
                  <Trash className="h-4 w-4" />
                  Deletar
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
